import { useState } from "react";

import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";

export default function Testing(){
 
    const [file, setFile] =useState(null);

  
 function handleUpload(){
    mediaUpload(file).then(
        (url)=>{
            toast.success("file uploaded successfully");
            console.log(url);
        }
    ).catch(
    (error)=>{
        console.log(error);
        toast.error("file upload failed")
    }
    )
 }
    return(
        <div className="w-full h-screen  flex flex-col justify-center item-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0])
                }
            }/>
            <button onClick={handleUpload} className="bg-gray-700 text-white p-2 rounded-lg">upload</button>
        </div>
    )
}