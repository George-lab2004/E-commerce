import React from 'react'
import styles from "../ProtectedRoutes/ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
if(localStorage.getItem("userToken")){
    return props.children; 
}else {
    return <Navigate to="/login">

 </Navigate>
}

    return (
    <div>ProtectedRoutes</div>
)    
}