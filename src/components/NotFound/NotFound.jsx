import React from 'react'
import styles from "../NotFound/NotFound.module.css"
import notFoundPic from "../../../finalProject assets/404.png"
export default function NotFound() {
return (
    <>
    <div className="container mx-auto text-center"></div>
    <img src={notFoundPic} className='w-full' alt="" />
    </>
)    
}