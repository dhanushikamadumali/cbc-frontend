import axios from 'axios';
import { useEffect, useState} from 'react';
import toast from 'react-hot-toast';

import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { GrEdit } from 'react-icons/gr';
import { Link, useNavigate } from "react-router-dom";
import Loader from '../../components/loader';


export default function AdminProdutctPage(){
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate();
    useEffect(
        ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (response)=>{
                        // console.log(response.data);
                        setProducts(response.data)
                        setLoaded(true)
                    }
                )
                
            }
            
        },
        [loaded]
    )

    //delete product
    async function deleteProduct(id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("please login to delete a product")
            return
        }
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
                headers:{
                    Authorization:"Bearer "+token
                }
            }) 
            setLoaded(false)
            toast.success("product deleted successfuly")
        } catch (error) {
            console.log(error);
            toast.error("Error deleting product")
            return
        }
       
    }
    
    return(
        <div className="w-full h-full rounded-lg relative">
        <Link to={"/admin/addProduct"} className='text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-point hover:bg-gray-300 hover:text-gray-700 absolute right-5 bottom-5'><FaPlus /></Link>
   
        {loaded &&  <table className='w-full'>
            <thead>
                <tr>              
                <th className='p-2'>Product Id</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Pice</th>
                <th className='p-2'>Labeled Price</th>
                <th className='p-2'>Stock</th>
                <th className='p-2'>Action</th>
                </tr>
            </thead>
            <tbody>
               
                {
                    products.map(
                        // keyweni ilakkmada kiyanne indx eken
                        (product,index)=>{                      
                            return(                               
                             <tr key={index} className='border-b-2 border-e-gray-300 text-center cursor-pointer hover:bg-gray-100'>
                                <td className='p-2'>{product.productId}</td>
                                <td className='p-2'>{product.name}</td>
                                <td className='p-2'>{product.price}</td>
                                <td className='p-2'>{product.labeledPrice}</td>
                                <td className='p-2'>{product.stock}</td>
                                <td className='p-2'>
                                    <div className='w-full h-full flex justify-center'>
                                    <FaRegTrashAlt onClick={
                                        ()=>{
                                            deleteProduct(product.productId)                                       
                                        }
                                    } className='text-[30px] m-[10px] hover:text-red-400' />
                                    <GrEdit
                                        onClick={
                                            ()=>{
                                                //load edit product form
                                                navigate("/admin/editProduct",{
                                                    state:product
                                                })
                                            }}
                                        className='text-[30px] m-[10px] hover:text-blue-400'/>
                                    
                                    </div>
                                </td>
                                </tr>
                            )
                        }
                    )
                    }
            
            </tbody>
        </table>}
        
        {
            !loaded && 
           <Loader/>
        }
        </div>
    )
}