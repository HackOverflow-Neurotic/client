import { useForm} from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import {api} from '../../utils/api';
import {toast} from 'sonner';
import { z } from 'zod';
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useState } from 'react';
import { set } from 'date-fns';

export default function ImageAnnotation(){
  const submitqna = api.imageRouter.annotateImage.useMutation({
    onSuccess: () => {
      toast.success('Image annotated')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
  const [imageUrl, setImageUrl] = useState<string >('');
  const [result, setResult] = useState<string[]>([]);

  async function submit(imageUrl:string){
    await submitqna.mutateAsync({imageUrl: imageUrl}).then((res:string[]) => {
      setResult(res);
    });
    console.log(result);
  }

  const handleUpload = async (result: CloudinaryUploadWidgetResults) => {
    console.log('hello');
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {

      const imageUrl = info?.secure_url as string;
      const public_id = info?.public_id as string;
      await submit(imageUrl);
    }
  };
   


    
    return(
        <>{
          JSON.stringify(result) ?? ''}
          <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} onUpload={handleUpload}>
            Upload Image
          </CldUploadButton>
          </>
    )
}