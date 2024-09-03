import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

export default function Checkout() {
    let { onlinePayment, cashPayment } = useContext(CartContext);
    let location = useLocation(); // Renamed to 'location' for clarity

    const [paymentType, setPaymentType] = useState(null);

    useEffect(() => {
        setPaymentType(location.state?.type); // Access 'type' correctly
    }, [location.state]); // Add 'location.state' as a dependency

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: (values) => {
            payOnline(values);
        }
    });

    async function payOnline(values) {
        if(paymentType == "online Payment"){
            await onlinePayment(values)
        }else {
            await cashPayment(values)
        }
    }

    return (
        <div className='w-1/2 mx-auto pt-32'>
            <h1 className='text-main font-bold text-lg '>{paymentType}</h1>
            <h1 className='font-bold text-2xl text-center pb-5 '>Checkout Form</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='my-2'>
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Details
                    </label>
                    <input
                        name='details'
                        type="text"
                        id="details"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {formik.touched.details && formik.errors.details ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.details}
                        </div>
                    ) : null}
                </div>
                <div className='my-2'>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input
                        name='phone'
                        type="number"
                        id="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.phone}
                        </div>
                    ) : null}
                </div>
                <div className='my-2'>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input
                        name='city'
                        type="text"
                        id="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                            {formik.errors.city}
                        </div>
                    ) : null}
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-end my-5'>
                        <button
                            type='submit'
                            className='bg-main text-white px-5 py-2 rounded-lg'
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            PayNow
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
