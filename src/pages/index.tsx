import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import ImageAnnotation from "~/components/ImageButton/ImageButton";
import Picture from "~/components/Camera/Picture";
import { api } from "~/utils/api";

export default function Home() {
  
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        {/* <ImageAnnotation /> */}
        <Picture />
      </div>
    </>
  );
}

