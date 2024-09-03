import React, { useContext, useEffect, useState } from 'react'
import styles from "../Cart/Cart.module.css"
import { countercontext } from '../Context/Counter'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../Context/CartContext'
import axios from 'axios'

export default function Cart() {
   
    const [cartItems, setcartItems] = useState([])
let {getCartProducts, deleteProduct, clearCart, updateCartItem, Price} = useContext(CartContext)

async function getCart() {

    let response = await getCartProducts()
    console.log(response, "CAAAART");
    
 setcartItems(response.data.data.products)
}

async function clearAll() {

    let response = await clearCart()
    setcartItems([])
console.log(response);

}
async function updateProduct(productId, count) {
    let response = await updateCartItem(productId, count)
    console.log(response, "UPDAAAAATE");
    setcartItems(response.data.data.products)

}


async function deleteItem(productId) {
  let response = await deleteProduct(productId)    
  console.log(response);
  setcartItems(response.data.data.products)
 
}
useEffect(()=>{
    getCart()
}, [])


return (
<>


<div className=" pt-12 relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <div className="text-right">
        <button onClick={clearAll} className='bg-red-600 text-white px-2 py-3 rounded-md'>clear cart</button>
    </div>
    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"> {Price}</span>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
  {cartItems.map((item)=>  
    (
    <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{item.product.title}                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
<button 
  onClick={() => {
    if (item.count - 1 <= 0) {
      deleteItem(item.product.id);
    } else {
      updateProduct(item.product.id, item.count - 1);
    }
  }} 
  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
  type="button"
> - </button>

                        <div>
                           <span>{item.count}</span>
                        </div>
                        <button onClick={()=>updateProduct(item.product.id, item.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">




                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price * item.count}
                </td>
                <td className="px-6 py-4">
                    <a onClick={()=>deleteItem(item.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr> 
    
  ))}
<tr className="bg-white border-b text-black text-center text-lg font-bold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
<td className='p-4'>Total Price</td>
<td className="col-span-4">{Price}</td>
<td className="p-4">


<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Checkout<svg class="text-white bg-main w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-black font-bold dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link to="/checkout"
        state={{type:"online Payment"}}
        
        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online Payment</Link>
      </li>
      <li>
        <Link to="/checkout"
        state={{type:"cash Payment"}} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cash</Link>
      </li>

    </ul>
</div>





</td>

</tr>
        </tbody>
    </table>

</div>

</>
)    
}