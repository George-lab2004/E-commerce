import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';

export default function FeatureProducts() {
  let {addProductToCart} = useContext(CartContext)
  let {addProductToWishList} = useContext(WishlistContext)
async function addToCart(productId) {
 let response =  await addProductToCart(productId)
 console.log(response);
}
async function addToWL(productId) {
  let response =  await addProductToWishList(productId)
  console.log(response);
 }


  function getFeatureProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["FeatureProducts"],
    queryFn: getFeatureProducts,
  });

  
  const [clickedProductId, setClickedProductId] = useState(null);

  const handleClick = (productId) => {
    setClickedProductId(clickedProductId === productId ? null : productId);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="container mx-auto flex flex-wrap">
      {data?.data.data.map(product => (
        <div key={product.id} className="lg:w-1/6 sm:w-1/2">
          <div className="product p-3">
            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <h5 className='text-main'>{product.category.name}</h5>
              <p>{product.title.split(" ").splice(0, 2).join(" ")}</p>
              <div className="flex justify-between items-center">
                <p className='w-1/2'>{product.price} EGP</p>
                <div className='w-1/2'>
                  <i className='rating-color fa fa-star'></i>{product.ratingsQuantity}
                </div>
   
              </div>
            </Link>
            <div className='text-end'>
            <svg
            onClick={()=>addToWL(product.id)}
                     className={`w-6 h-6 text-gray-800 dark:text-white custom-icon ${
                      clickedProductId === product.id ? 'clicked' : ''
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                  </svg>


                </div>
            <div className='text-center'>
              <button onClick={()=>addToCart(product.id)} className='btn bg-main text-white px-3 py-2 rounded-md'>Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
