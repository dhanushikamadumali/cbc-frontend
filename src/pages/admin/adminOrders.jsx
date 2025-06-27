import axios from "axios";
import { useEffect, useState } from "react";
import Loader from '../../components/loader';
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrderPage(){
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelIsDisplaying, setmodelIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);
    useEffect(
        ()=>{
            if(!loaded){                
                    const token = localStorage.getItem("token")
                    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/order",{
                        headers : {
                            Authorization : "Bearer "+token
                        }
                    }).then(
                        (response)=>{     
                            console.log(response.data);                    
                            setOrders(response.data)
                            setLoaded(true)
                        }
                    )
                
            }
            // defendency array loaded eka wenas unoth aye loop wenawa            
        },[loaded]
    )


function changeOrderStatus(orderId,status){
       const token = localStorage.getItem("token")
    axios.put(import.meta.env.VITE_BACKEND_URL+"/api/order/"+orderId,{
        status:status
    },{
        headers : {
            Authorization : "Bearer "+token
        }
    }).then(
        ()=>{    
            toast.success("order status chnaged successfully");
            setLoaded(false)
        }
    )
}
     return(
        <div className="w-[full] h-full">
       
        {

            loaded?
            <div className="w-full h-full ">
             <table className="w-[full]">
             <thead>
             <tr>

             <th>Order Id</th>
             <th>Customer Email</th>
             <th>Customer Name</th>
             <th>Address</th>
             <th>Phone Number</th>
             <th>Status</th>
             <th>Total</th>
             <th>Date</th>
             <th>Action</th>
             
             </tr>
             </thead>   
             <tbody>
                {
                    orders.map(
                        (order)=>{
                            return(
                            <tr 
                                key={order.orderId}
                                className='border-b-2 border-e-gray-300 text-center cursor-pointer hover:bg-gray-100'
                               
                            >
                                    <td className="p-2">{order.orderId}</td>                                   
                                    <td className="p-2">{order.email}</td>
                                    <td className="p-2">{order.name}</td>
                                    <td className="p-2">{order.address}</td>
                                    <td className="p-2">{order.phoneNumber}</td>
                                    <td className="p-2">
                                    <select value={order.status} className="z-[50]" onChange={
                                        (e)=>{
                                            changeOrderStatus(order.orderId,e.target.value)
                                        }
                                    } >
                                            <option value={"Pending"}>Pending</option>
                                             <option value={"Delivered"}>Delivered</option>
                                             <option value={"Cancelled"}>Cancelled</option>
                                             <option value={"Processing"}>Processing</option>
                                        </select>
                                    </td>
                                    <td className="p-2">{order.total.toFixed(2)}</td>
                                    <td className="p-2">{new Date(order.date).toDateString()}</td>
                                    <td className="p-2">
                                        <button className="bg-gray-700 text-white p-2 rounded-lg"
                                             onClick={()=>{ setmodelIsDisplaying(true)
                                                    setDisplayingOrder(order)
                                                }}
                                           
                                        >
                                        Details
                                        </button>
                                    </td>
                                    </tr>
                            )

                        }
                    )
                }
                    </tbody>
                </table>
                {
                    modelIsDisplaying && 
                    <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                        <div className="w-[600px] max-w-[600px] h-[600px] max-h-[600px]  bg-white relative">
                        <div className="w-full h-[200px] ">
                                <h1 className="text-sm font-bold  p-2">Order Id:{displayingOrder.orderId}</h1>
                                 <h1 className="text-sm font-bold p-2">Order Date:{new Date(displayingOrder.date).toDateString()}</h1>
                                 <h1 className="text-sm font-bold p-2">Order Id:{displayingOrder.status}</h1>
                                 <h1 className="text-sm font-bold  p-2">Order Total:{displayingOrder.total.toFixed(2)}</h1>
                        </div>  
                        <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                            {
                                displayingOrder.billItems.map((item,index)=>{
                                    return(
                                        <div key={index} className="w-full h-[100px] bg-whitw shadow-2xl my-[5px] flex justify-between items-center relative">
                                        <img src={item.image} className="h-full aspect-squre object-cover"/>
                                        <div className="h-full max-w-[300px] overflow-hidden">
                                            <h1 className="text-xl font-bold">{item.productName}</h1>
                                            <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                                            <h2 className="text-lg text-gray-500">Quantity:{item.quantity}</h2>
                                        </div>
                                        </div>
                                    )
                                })
                            }
                             
                            
                        </div>
                        <button className="w-[40px]  h-[40px] rounded-full bg-white shadow shadow-black flex justify-center items-center absolute right-[-20px] top-[-20px]" 
                            onClick={()=>{
                                setmodelIsDisplaying(false)
                                }}
                        ><IoCloseSharp  /></button>
                        </div>
                    </div>
                }
            </div>
            :<Loader/>

        }
        </div>
    )
}

// 384325350141-1mfdr3s2l8nbrcoks8pn0bscqesefv2o.apps.googleusercontent.com