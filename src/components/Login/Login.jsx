import React, { useState } from 'react'
import { createContext } from "react";
import { useContext } from 'react';
import { TokenContext } from '../Context/TokenContext';
import styles from "../Login/Login.module.css"
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    let {token, setToken } = useContext(TokenContext)

    const [userMessage, setuserMessage] = useState(null)

    const [useError, setuseError] = useState(null)
    const [isLoading, setisLoading ] = useState(false)

    let navigate = useNavigate()



    let mySchema = Yup.object({
      email:Yup.string().required("email is required").email("invalid email"),
      password:Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,20}$/, "password isnt valid"),
    })

    let formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:mySchema,
        onSubmit:(values)=>{
    loginForm(values)        
        }
        })

async function ForgetPassword() {
    setisLoading(true)

    navigate("/Forget")
    setisLoading(false)

}

        async function loginForm(values) {
            setisLoading(true)
            
             return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
             .then((data)=>{
console.log(data.data);

setuserMessage(data.data.message);
//login
localStorage.setItem("userToken", data.data.token)
//localstorage
setToken(data.data.token)
setisLoading(false)
navigate("/")
console.log("Registered User Data:", values);
             })

          }

return (
    <div className="pt-32 container mx-auto px-5">
    <h1 className='text-main text-2xl'> Login Now</h1>
{useError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{useError}
</div> : null
}


{userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
{userMessage}
</div> : null

}



    <form onSubmit={formik.handleSubmit}>

        <div className='my-2'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
                name='email'
                type="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
            />
            {formik.touched.email && formik.errors.email ? (
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                    {formik.errors.email}
                </div>
            ) : null}
        </div>
        <div className='my-2'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
                name='password'
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
            />
            {formik.touched.password && formik.errors.password ? (
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                    {formik.errors.password}
                </div>
            ) : null}
        </div>
<div className='flex items-center justify-between'>
        <div className='text-end my-5'>
            {isLoading?
            <button
            type='submit'
             className='bg-main text-white px-5 py-2 rounded-lg'>
<i className='fa fa-spinner fa-spin'></i> 
            </button> : <button 
            type='submit'
             className='bg-main text-white px-5 py-2 rounded-lg'
             disabled = {!(formik.isValid &&
                 formik.dirty)}
             
             >
                Login</button>
            }

            

        </div>

        <button onClick={ForgetPassword} className='bg-main text-white rounded-lg px-5 py-2'>
            ForgetPassword
            </button> 
    
    </div>
    </form>

</div>)    
}