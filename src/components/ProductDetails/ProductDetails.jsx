import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom';

import styles from "../ProductDetails/ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import Products from '../Products/Products'
import { CartContext } from '../Context/CartContext';
export default function ProductDetails() {
    let {id, category} = useParams()
    const [ProductDetails, setProductDetails] = useState({})
const [isLoading, setisLoading] = useState(true)
const [errorMessage, seterrorMessage] = useState(null)
const [relatedProducts, setRelatedProducts] = useState([])
let {addToCart} = useContext(CartContext)

async function addProductToCart(productId) {
await addToCart(productId)
}

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    autoplaySpeed:2000
  };

async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
        setProductDetails(data?.data.data)
        setisLoading(false)
        console.log(data.data.data);
        
    }).catch((error)=>{
        console.log(error);
        seterrorMessage(error.Message)
        setisLoading(false)
    })
}

async function getRelatedProduct() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data)=>{

        let relatedProducts = data.data.data;
        relatedProducts =  relatedProducts.filter((Product)=> Product.category.name == category)
        // console.log(relatedProducts, "hurw4fij");
        setRelatedProducts(relatedProducts)
    }).catch((error)=>{
      
    })
}




useEffect(()=>{
    getProductDetails()
    getRelatedProduct()
}, [])
useEffect(()=>{
    <Loader/>
    getProductDetails()
}, [id])

return ( <>
<div className="container mx-auto mt-28">
 {isLoading ? <Loader/>  : null }
<div className="flex">
<div className="w-1/4">
<Slider {...settings}>
     {ProductDetails?.images?.map((src)=> <img src={src} alt="" />) }
    </Slider>
{/* <img src={ProductDetails.imageCover} alt="" /> */}
</div>
<div className="w-3/4 mt-10">
<h1 className='text-black font-bold text-2xl my-5'>{ProductDetails.title}</h1>
<h3 className='text-gray-700 my-5'>{ProductDetails.ratingsQuality}</h3>
 <p className='my-5'>{ProductDetails.category?.name}</p>
<div className="flex justify-between items-center">
<p className='w-1/2'>{ProductDetails.price}EGP</p>
<div className='w-1/2'>
            <i className='rating-color fa fa-star'></i>{ProductDetails.ratingsQuantity}
        </div>
        <div className='text-center w-11/12'>
        <button className='btn bg-main w-full text-white px-3 py-2 rounded-md '>Add to cart</button>
    </div>
</div>
</div>

</div>

</div>
<h1 className='mt-20 text-xl font-bold ps-10'>Related Products</h1>

<div className="container mx-auto flex flex-wrap">
      {relatedProducts.map(product => (
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
            <div className='text-center'>
              <button onClick={()=>addProductToCart(details.id)} className='btn bg-main text-white px-3 py-2 rounded-md'>Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
</>
)    
}