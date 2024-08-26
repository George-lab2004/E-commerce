import React from 'react'
import styles from "../Categories/Categories.module.css"
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';

export default function Categories() {


    function getCat() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["Categories"],
        queryFn: getCat,
      });
        if (isLoading) return <Loader />;
        if (isError) return <p>{error.message}</p>;
        console.log(data?.data.data);
return (
    <>
    <div className="container mx-auto flex flex-wrap justify-center items-center">
    {data?.data.data.map(cat => (
    <div className="max-w-sm card rounded overflow-hidden shadow-lg  p-5 lg:w-1/3 sm:w-full"  >
  <img className="w-full h-[25rem]" src={cat.image} alt="..."/>
  <div className="px-6 py-4">
    <h5 className="font-bold text-xl mb-2">{cat.name}</h5>
  </div>
</div>
    ))}
</div>

    </>
)    
}