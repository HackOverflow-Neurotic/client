import { ImageAnnotatorClient } from '@google-cloud/vision';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

interface ImageAnnotationRequest {
  imageUrl: string;
}

async function detectObjectsInImage(imageRequest: ImageAnnotationRequest) {
  // Use environment variables for credentials (more secure)
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const credentials = process.env.GOGLE_CLOUD_VISION_CREDS ?? '';


  // Authenticate using a service account JSON file
  const visionApiClient = new ImageAnnotatorClient({
    projectId,
    credentials: {
        "type": process.env.GOOGLE_CLOUD_TYPE,
        "project_id": process.env.GOOGLE_CLOUD_PROJECT_ID,  
        "private_key_id": process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        "private_key": process.env.GOOGLE_CLOUD_PRIVATE_KEY,
        "client_email": process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        "client_id": process.env.GOOGLE_CLOUD_CLIENT_ID,
        "audience": process.env.GOOGLE_CLOUD_AUDIENCE,
        "token_url": process.env.GOOGLE_CLOUD_TOKEN_URL,
        "universe_domain": process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN 
    },   
  });

  // Build the request object
  const request = {
    "requests": [
      {
        "features": [
          {
            "maxResults": 50,
            "type": "LANDMARK_DETECTION"
          },
          {
            "maxResults": 50,
            "type": "FACE_DETECTION"
          },
          {
            "maxResults": 50,
            "model": "builtin/latest",
            "type": "OBJECT_LOCALIZATION"
          },
          {
            "maxResults": 50,
            "model": "builtin/latest",
            "type": "LOGO_DETECTION"
          },
          {
            "maxResults": 50,
            "type": "LABEL_DETECTION"
          },
          {
            "maxResults": 50,
            "model": "builtin/latest",
            "type": "DOCUMENT_TEXT_DETECTION"
          },
          {
            "maxResults": 50,
            "type": "SAFE_SEARCH_DETECTION"
          },
          {
            "maxResults": 50,
            "type": "IMAGE_PROPERTIES"
          },
          {
            "maxResults": 50,
            "type": "CROP_HINTS"
          }
        ],
        "image": {
          source: {
            imageUri: imageRequest.imageUrl
          }
        },
        
      }
    ]
  }

  try {
    const requestObject = request.requests[0];
  if (!requestObject) {
    throw new Error('Request object is undefined');
  }
    const [response] = await visionApiClient.annotateImage(requestObject);
  const objects = response.localizedObjectAnnotations ??  [];
    return objects.map((object) => object.name ?? '');
  } catch (error) {
    console.error('Error detecting objects:', error);
    throw new Error('Failed to detect objects in image');
  }
}

export const ImageRouter = createTRPCRouter({
  annotateImage: protectedProcedure
    .input(z.object({ imageUrl: z.string().url() })) // Validate as URL
    .mutation(async ({ input }) => {
      const detectedObjects = await detectObjectsInImage(input);
      return detectedObjects;
    }),
});