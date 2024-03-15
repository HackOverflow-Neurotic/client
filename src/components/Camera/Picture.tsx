import React, { useState, useRef } from 'react';

const Picture = () => {
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const takePicture = async () => {
    if (navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current!.srcObject = stream;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = videoRef.current!.videoWidth;
        canvas.height = videoRef.current!.videoHeight;

        context!.drawImage(videoRef.current!, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        setPhotoPath(dataURL);

        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    } else {
      console.error('getUserMedia not supported');
    }
  };

  return (
    <div>
      <video ref={videoRef} width="300" height="200" autoPlay muted />
      <button onClick={takePicture}>Click</button>
      {photoPath && <img src={photoPath} alt="Captured Photo" />}
    </div>
  );
};

export default Picture;