// cart eka aragnna localstorage eken
export default function getCart(){
    let cart = localStorage.getItem("cart");
    //  // cart eka null nam 
    if(cart == null){
        // empty arrray
        cart = []
       
        // cart json eka string karanwa
        localStorage.setItem("cart", JSON.stringify(cart))
        return[]
    }
    // string eka json karanawa
    cart =  JSON.parse(cart)
    return cart
}
// car ekata item add karanwa
export function addToCart(product,qty){
    // cart eka gannawa
    let cart = getCart();
    // passwela awa product id eka tiynawada
    // findIndex eken karanne passwela awa product id eka tiyanawada nathtam index eka -1 wenawa
    const productIndex = cart.findIndex((prdct) => prdct.productId === product.productId);
    // -1 , index
    // product index eka -1 nam cart ekata push karanawa
    if(productIndex == -1){
        cart.push(
            {
                productId : product.productId,
                name : product.name,
                altNames : product.altNames,
                price : product.price,
                labeledPrice : product.labeledPrice,
                image : product.images[0],
                quantity:qty,
               
            }
        )
    }else{
        // innawanam adala kenage qty eka wadi karanwa
        cart[productIndex].quantity += qty
        // product qty eka 0 ta adunam adala kenawa  ain wenna ona
        // qty eka rina ganan walta giyoth product eka ain wenwa
        
        if(cart[productIndex].quantity <= 0 ){
            // quntity eka rina ganan walata giyoth product eke anik dewal ain karala product id eka save wenawa
            cart = cart.filter((prdct)=> prdct.productId !== product.productId)
        }
    }
    // save karagannawa
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function removeFromCart(productId){
    let cart = getCart();
    cart = cart.filter((product) => product.productId !== productId)
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function getTotal(){
    let cart = getCart();
    let total = 0;
    cart.forEach((product)=>{
        total += product.price * product.quantity
    })
    return total
}

export function getTotalForLabledPrice(){
     let cart = getCart();
   
    let total = 0;
    cart.forEach((product)=>{
        total += product.labeledPrice * product.quantity

    })
    return total
}