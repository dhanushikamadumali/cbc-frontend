import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function loginPage(){
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const loginWithGoogle = useGoogleLogin(
   {
    onSuccess:(res)=>{
        setLoading(true)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/google",{
            accessToken : res.access_token
        }).then(
            (response)=>{
                 console.log("login succssful",response.data);
                toast.success("login succssful");
                localStorage.setItem("token",response.data.token)
                
                const user = response.data.user;
                if(user.role === "admin"){
                    // go to the admin page
                    navigate("/admin")                   
                }else{
                    // go to the home page
                   navigate("/")
                }
                setLoading(false);
            }
        )
    }
   }
  );

    function handleLogin(){
       setLoading(true)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email:email,
            password:password
        }).then(
            (response)=>{
                console.log("login succssful",response.data);
                toast.success("login succssful");
                localStorage.setItem("token",response.data.token)
                
                const user = response.data.user;
                if(user.role === "admin"){
                    // go to the admin page
                    navigate("/admin")                   
                }else{
                    // go to the home page
                   navigate("/")
                }
                setLoading(false)
            }
        ).catch(
            (error)=>{
                console.log("login faild",error.response.data);
                toast.error(error.response.data.message||"login failed");
                setLoading(false)
            }
           
            
        )
   }
    return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className="w-[50%] h-full"></div>
        <div className="border  w-[50%] h-full flex justify-center items-center" >
            <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                <input onChange={
                    (e)=>{
                    setEmail(e.target.value);
                }} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="email"/>
                <input onChange={
                    (e)=>{
                    setPassword(e.target.value);
                }} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="password"/>
               <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer" >
               {
                loading?"Loading...":"Login"                
               }
              </button>
             <button className="w-[400px] h-[50px] mt-[20px] bg-green-500 text-white rounded-xl cursor-pointer flex items-center justify-center"
             onClick={loginWithGoogle}
             >
              <GrGoogle className="mr-[10px]"/>
                {
                loading?"Loading...":"  Login with Google"                
               }          
              </button>
              <p className="text-gray-600 text-center m-[10px]">
              Don't have an account yet?
              &nbsp;
              <span className="text-red-500 cursor-pointer hover:text-green-700">
                <Link to="/register">Register Now</Link> 
              </span>
              </p>
                </div>
        
        
        </div>
       
    </div>
   ) 
}