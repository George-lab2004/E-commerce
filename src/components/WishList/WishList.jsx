import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../Context/WishlistContext';

export default function Cart() {
  const [WlItems, setWlItems] = useState([]);
  let { getWishListProducts, deleteProduct } = useContext(WishlistContext);

  async function getWL() {
    let response = await getWishListProducts();
    console.log(response, "WL");
    setWlItems(response.data.data);
  }
  async function deleteItem(productId) {
    let response = await deleteProduct(productId)    
    console.log(response);
  setWlItems(prevItems => prevItems.filter(item => item._id !== productId));   
  }
  useEffect(() => {
    getWL();
  }, []);

  return (
<div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className='text-2xl ps-5 font-bold pt-5'> My Wish List:</h1>

    <div className="space-y-4">
        {WlItems.map((item) => (
            <div key={item?._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                    <img src={item?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item?.title} />
                    <span className="font-semibold text-gray-900 dark:text-white">{item?.title}</span>
                    <a onClick={()=>deleteItem(item?._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>

                </div>
                <button 
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
</div>

  );
}
