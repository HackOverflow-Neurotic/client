import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ImageAnnotation from '~/components/ImageButton/ImageButton';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment',
};

function App() {
  const webcamRef = useRef(null);
  const [photoLocation, setPhotoLocation] = useState(null); // Add this line

  // const capture = useCallback(() => {
    
  // }, [webcamRef]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webcamRef.current) {
        //@ts-ignore
        const imageSrc = webcamRef.current.getScreenshot();
        setPhotoLocation(imageSrc); // Update the photo location
      }
    },1000/30)

    return () => {
      clearInterval(intervalId);
    }
  })

  return (
    // <>
    //   <div className="flex justify-center items-center w-full ">
    //     <Webcam
    //       audio={false}
    //       height={720}
    //       ref={webcamRef}
    //       screenshotFormat="image/jpeg"
    //       width={1280}
    //       //@ts-ignore
    //       videoConstraints={videoConstraints}
    //     />
        
    //   </div>
    //   {photoLocation && <img src={photoLocation} alt="captured" />}
    // </>
    <ImageAnnotation />
  );
}

export default App;