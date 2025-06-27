import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProdutctPage from "./admin/product";
import AddProductForm from "./admin/addProduct";
import EditProductForm from "./admin/editProduct";
import AdminOrderPage from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage(){
    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate(); 
    useEffect  (()=>{
        const token =localStorage.getItem("token");
        if(token == null){
            toast.error("You are not logged in");
            navigate("/login");
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current",{
                headers:{
                    Authorization: "Bearer "+ token,
                },
            }).then((response) =>{
                console.log(response);
                if(response.data.user.role == "admin"){
                    setUserValidated(true);
                   
                }else{
                    toast.error("You are not an admin");
                     navigate("/login");
                }
            }).catch((error)=>{
                ()=>{
                    toast.error("Something went wrong please login");
                     navigate("/login");
                }
            });
        }
    },[])
    return(
       
             <div className="w-full h-screen bg-gray-200 flex p-2">
             {userValidated ?(
                 <>
                         <div className="h-full w-[300px]">
                            <Link to="/admin/users" className="p-2 flex item-center"><FaUsers className="mr-2 mt-1"/>Users</Link>
                            <Link to="/admin/products" className="p-2 flex item-center"><MdWarehouse className="mr-2 mt-1" />Products</Link>
                            <Link to="/admin/orders" className="p-2  flex item-center"><FaFileInvoice className="mr-2 mt-1" /> Orders</Link>
       
                            </div>
                        <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg ">
                            <Routes path="/*">
                            <Route path="/users" element={<h1>Users</h1>}/>
                            <Route path="/products" element={<AdminProdutctPage/>}/>
                            <Route path="/addProduct" element={<AddProductForm/>}/>
                            <Route path="/orders" element={<AdminOrderPage/>}/>
                            <Route path="/editProduct" element={<EditProductForm/>}/>
           
                            </Routes>
                        </div>
                    </>
                    
             ):(
             <Loader/>
             )
             
             
             }
            </div>
       
       
    );
}