import React, { useState } from 'react';
import styles from "../Register/Register.module.css"; // Importing CSS module for styling
import { useFormik } from 'formik'; // Importing Formik for form handling
import * as Yup from 'yup'; // Importing Yup for form validation
import axios from 'axios'; // Importing Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

export default function Register() {

    // State to store success message after registration
    const [userMessage, setuserMessage] = useState(null);

    // State to store error messages if registration fails
    const [useError, setuseError] = useState(null);

    // State to manage loading state during form submission
    const [isLoading, setisLoading ] = useState(false);

    // useNavigate hook for programmatic navigation
    let navigate = useNavigate();

    // Yup schema for form validation
    let mySchema = Yup.object({
        name: Yup.string().required("Name is Required").min(3, "cant be less than 3 chars").max(10, "max is 10 chars"),
        email: Yup.string().required("email is required").email("invalid email"),
        password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,8}$/, "password isnt valid"),
        rePassword: Yup.string().required("repass is required").oneOf([Yup.ref("password"), "DOESNT MATCH PASSWORD"]),
        phone: Yup.string().required().matches(/^(002)?01[0125][0-9]{8}$/, "phone isnt valid")
    });

    // useFormik hook to manage form state, validation, and submission
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: mySchema, // Validation schema
        onSubmit: (values) => {
            registerForm(values); // Call function to handle form submission
        }
    });

    // Function to handle form submission and API call for registration
    async function registerForm(values) {
        setisLoading(true); // Set loading state to true
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            console.log("Data is: " + response.data.message);
            setuserMessage(response.data.message); // Set success message
            setisLoading(false); // Set loading state to false
            navigate("/login"); // Navigate to login page after successful registration
            console.log("Registered User Data:", values);
        } catch (err) {
            console.log(err.response.data.message);
            setisLoading(false); // Set loading state to false
            setuseError(err.response.data.message); // Set error message
        }
    }

    return (
        <div className="container mx-auto px-5">
            <h1 className='text-main text-2xl'>Register Now</h1>

            {/* Display error message if there is one */}
            {useError ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {useError}
                </div>
            ) : null}

            {/* Display success message if registration is successful */}
            {userMessage ? (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {userMessage}
                </div>
            ) : null}

            {/* Form with various input fields */}
            <form onSubmit={formik.handleSubmit}>
                <div className='my-2'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input
                        name='name'
                        type="text"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {/* Display validation error message for name field */}
                    {formik.touched.name && formik.errors.name ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>
                
                {/* Similar structure for email field */}
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
                    {/* Display validation error message for email field */}
                    {formik.touched.email && formik.errors.email ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                
                {/* Similar structure for password field */}
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
                    {/* Display validation error message for password field */}
                    {formik.touched.password && formik.errors.password ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                
                {/* Similar structure for re-password field */}
                <div className='my-2'>
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-Password</label>
                    <input
                        name='rePassword'
                        type="password"
                        id="rePassword"
                        onChange={formik.handleChange}
                        value={formik.values.rePassword}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {/* Display validation error message for re-password field */}
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.rePassword}
                        </div>
                    ) : null}
                </div>
                
                {/* Similar structure for phone field */}
                <div className='my-2'>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input
                        name='phone'
                        type="tel"
                        id="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {/* Display validation error message for phone field */}
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.phone}
                        </div>
                    ) : null}
                </div>
                
                {/* Submit button with loading spinner during form submission */}
                <div className='text-end my-5'>
                    {isLoading ? (
                        <button type='submit' className='bg-main text-white px-5 py-2 rounded-lg'>
                            <i className='fa fa-spinner fa-spin'></i> 
                        </button>
                    ) : (
                        <button type='submit' className='bg-main text-white px-5 py-2 rounded-lg' 
                            disabled={!(formik.isValid && formik.dirty)}>
                            Register
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
