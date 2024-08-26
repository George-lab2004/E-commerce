import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import styles from "../Brands/Brands.module.css"
import slider1 from "./../../../finalProject assets/images/grocery-banner-2.jpeg"

export default function Brands() {
    

    function getBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      }
      const { data, isError, isLoading, error } = useQuery({
        queryKey: ["Brands"],
        queryFn: getBrands,
      });
      console.log(data?.data.data);
      
      if (isLoading) return <Loader />;
      if (isError) return <p>{error.message}</p>;


return (
    <>

        <div className='pt-12 text-center mt-4 text-green-400 font-bold text-3xl'>
        <h1>All Brands</h1>
    </div>
    <div className='container mx-auto flex flex-wrap px-10'>
    {data?.data.data.map(product => (
        <div key={product.id} className="lg:w-1/4 sm:w-1/2">
          <div className="products p-3 border mx-2 my-2">
    
              <img src={product.image} className='w-full' />
              <h5 className='text-center'>{product.name}</h5>
  


          </div>
        </div>
      ))}
  
    
    </div>
    </>
)    
}