import Header from "../components/header";
import {Route,Routes} from "react-router-dom";
import ProductsPage from "./client/productsPage";
import ProductCard from "../components/product-card";
import ProductOverView from "./client/productOverView";
import CartPage from "./client/cartPage";
import CheckoutPage from "./client/checkoutPage";

export default function HomePage(){
    return(
        <div className="w-full h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)]  min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home Page</h1>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/overview/:id" element={<ProductOverView/>} />
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                   
                    <Route path="/*" element={<h1>404 not found</h1>}/>
                  
                    </Routes>
            </div>

        </div>
    )
}