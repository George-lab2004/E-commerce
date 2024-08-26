import React from 'react'
import styles from "../CategorySlider/CategorySlider.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick'

export default function CategorySlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false,
        autoplay:true,
        autoplaySpeed:2000
      };

function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}

    let {data} = useQuery({
        queryKey:["CategorySlider"],
        queryFn:getCatSlider,
    })
    console.log(data?.data.data);
    
return (
<>
<div className="container mx-auto">
    <h1>Show Popular Categories :</h1>
<Slider {...settings}>
     {data?.data.data.map((cat)=> <div className="text-center">
        <>
        <img src={cat.image} className='h-[200px] my-10' alt="" />
        </>
        </div>
       ) }
    </Slider>
</div>

</>)    
}