import React from 'react'
import styles from "../Layout/Layout.module.css"
import {Outlet} from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
return (
    <>
    <Navbar/>

    <Outlet/>
    <Footer/>
    </>
)    
}