import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [number, setnumber] = useState(0)
    const [Price, setPrice] = useState(0)
let headers = {
    token : localStorage.getItem("userToken")
}



async function addProductToCart(productId) {
return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
productId

},{
 headers
}).then((response)=>{
    console.log(response.data.message);
    setnumber(response.data.numOfCartItems)
    // setPrice(response.data.totalCartPrice)
    toast.success(response.data.message)
    return response;
}  ).catch((error)=>{ 
    toast.error(response.data.message)
    return error;
})
}

async function getCartProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers
    }).then((response)=>{
        console.log(response);
        setnumber(response.data.numOfCartItems)
        setPrice(response.data.data.totalCartPrice)

        return response
        
    }).catch((error)=>{
        console.log(error);
        return error
        

    })
}

async function  deleteProduct(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    }).then((response)=>{
        console.log(response);
        setnumber(response.data.numOfCartItems)
        setPrice(response.data.data.totalCartPrice)

        return response
        
    }).catch((error)=>{
        console.log(error);
        return error
        

    })
}
async function updateCartItem(productId, count) {
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
count
    }, {
        headers
    }).then((response)=>{
        console.log(response);
        setPrice(response.data.data.totalCartPrice)

        return response
        
    }).catch((error)=>{
        console.log(error);
        return error
        

    })
}

async function  clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
        console.log(response);
        setnumber(response.data.numOfCartItems)
        setPrice(response.data.data.totalCartPrice)

        return response
        
    }).catch((error)=>{
        console.log(error);
        return error
        

    })
}





    return <CartContext.Provider value={{addProductToCart, number, deleteProduct, getCartProducts, clearCart, Price, updateCartItem }}>
{props.children}

    </CartContext.Provider>
}