"use client";
import "@uploadthing/react/styles.css"
import { UploadButton } from "@/app/utils/uploadthings";

export default function UploadButtonPage() {
  return (
    <main className="">
      <UploadButton 
        endpoint="imageUploader"
        onClientUploadComplete={(res:any) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          //we have response we can store the url in mongodb
          alert("Upload Completed");
          //console.log(res.data.url); 
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
