import { useForm} from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import {api} from '../../utils/api';
import {toast} from 'sonner';
import { z } from 'zod';
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useState } from 'react';
import { set } from 'date-fns';
import { useSession } from 'next-auth/react';


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
      console.log(result);
      setResult(res);
    });
  }

  const handleUpload = async (result: CloudinaryUploadWidgetResults) => {
    console.log('hello');
    console.log(result);
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {

      const imageUrl = info?.secure_url as string;
      const public_id = info?.public_id as string;
      await submit(imageUrl);
    }
  };

  const {data:session} = useSession();
   


    
    return(
        
        //   <div className='gap-2'>
        //   {
        //   // <Textarea value={JSON.stringify(result) ?? ''}>
            
        //   // </Textarea>
          
        // }
          // <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} onUpload={handleUpload} className='mt-10 text-black bg-white px-4 py-2 rounded-lg'>
          // Upload Image
          // </CldUploadButton>
        //   </div>
        <div className='flex w-full justify-center'>
          {
            !session?.user && (
              <h1 className='text-4xl font-semibold text-white'>Login to use this feature</h1>
            )
          }
          {
            session?.user && result.length === 0 && (
              <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} onUpload={handleUpload} className='mt-10 text-white rounded-lg'>
          <div className='w-[75vw] h-[20rem] border-[1px] border-white rounded-lg flex justify-center items-center bg-slate-500 opacity-50 backdrop-blur-xl'>
            Click here to choose or drop an image
          </div>
          </CldUploadButton>
            )
          }{
            session?.user && result.length > 0 && (
              <>
                <div className='flex flex-col gap-6 justify-start items-center w-full'>
                  <h3 className='text-4xl font-semibold text-left'>This image contains</h3>
                  <ul className='flex flex-col gap-2 list-disc text-2xl'>
                    {
                     result.map((res,index) => {
                      return(
                        <li key={index}>
                          {res}
                        </li>
                      )
                     })
                    }

                  </ul>
                  <Button onClick={() => {
                    setResult([])
                  }}>Reset</Button>
                </div>
              </>
            )
          }
        </div>

          
    )
}