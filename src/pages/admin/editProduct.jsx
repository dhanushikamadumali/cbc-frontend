import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GiPriceTag } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductForm(){
   //location data
    const locationData = useLocation();
   if(locationData.state == null){
        toast.error("Please select a product to edit")
        window.location.href = "/admin/products"
   }
   
    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altNames,setAltname] = useState(locationData.state.altNames.join(","));
    const [price,setPrice] = useState(locationData.state.price);
    const [labeledPrice,setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description,setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const navigate = useNavigate();
    const [images,setImages] = useState([]);


 async function handleSubmit(){
    const promisesArray = []
    for (let i=0; i<images.length; i++){
        // console.log(images[i]);
        const promise = mediaUpload(images[i])
        promisesArray[i] =promise
    }
    // promise godak eka apara run karnawa
try{
    let result = await Promise.all(promisesArray)
  
    if(images.length == 0 ){
        result = locationData.state.images
    }
    const altNamesInArray = altNames.split(",")
        // console.log(altNamesInArray);
        const product ={
            productId : productId,
            name: name,
            altNames : altNamesInArray,
            price: price,
            labeledPrice:labeledPrice,
            description:description,
            stock:stock,
            images :result
        }
        const token = localStorage.getItem("token")
        console.log(token);
        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product ,{
            headers : {
                "Authorization" : "Bearer "+token
            },
        })
        toast.success("product updated susccessfully");
        navigate("/admin/products");
          
       
        }catch(error){
            toast.error("product adding failed");
        }
    }
 
    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center ">         
        <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">        
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Product</h1>
        <input 
            disabled        
            value={productId} 
                onChange={
                    (e)=>{
                        setProductId(e.target.value)
                    }
                }       
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  
                placeholder="product Id"
        />
        <input  value={name}
                onChange={
                    (e)=>{
                       setName(e.target.value)
                    }
                }
                 className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="product Name"/>        
        <input
                value={altNames}
                onChange={
                    (e)=>{
                        setAltname(e.target.value);                       
                    }
                }
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="Alternative Name"/>
        <input 
                value={price}
                onChange={
                    (e)=>{
                        setPrice(e.target.value);
                    }
                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="Price"/>
        <input
                value={labeledPrice}
                onChange={
                    (e)=>{
                        setLabeledPrice(e.target.value);
                    }
                }
                  type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="Labeled Price"/>
        <textarea 
                value={description}
                onChange={
                    (e)=>{     
                        setDescription(e.target.value);
                    }
                }
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="Description"/>
            <input 
                type="file"
                onChange={(e)=>{
                    setImages(e.target.files)
                }
                }
            multiple
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="images"
            />
                <input
                value={stock}
                onChange={
                    (e)=>{     
                        setStock(e.target.value);
                    }
                }
                 className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"  placeholder="Stock"/>
        <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
            <Link to={"/admin/product"} className="bg-red-500 text-whitw p-[10px] w-[180px] text-center rounded-lg hover:bg-red-600 text-white">Cancle</Link>
            <button onClick={handleSubmit}  className="bg-green-500 text-whitw p-[10px] w-[180px] text-center rounded-lg hover:bg-green-600 text-white">Edit product</button>
        </div>
        </div>
        </div>
        
    )
}