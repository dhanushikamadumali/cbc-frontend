
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    "https://lfbfkeuyuhvpuewozapg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYmZrZXV5dWh2cHVld296YXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzMwMDksImV4cCI6MjA2MTYwOTAwOX0.dkc-mWSsvMSdbxLeJBzaSz7HiLYtoTunQEIBbd86wx8"
);



export default function mediaUpload(file){

    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name
        
            supabase.storage.from("images").upload(newFileName,file,{
                cacheControl:"3600",
                upsert:false,

            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error);
                    reject("file upload failed")
                }
            )

        }
    )
return promise;

}


   


