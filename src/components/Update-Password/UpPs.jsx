import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';

export default function ResetnewPassword() {
  const [userMessage, setUserMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{5,200}$/, 'Password must be at least 6 characters, with the first letter capitalized'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => resetPassword(values),
  });

  async function resetPassword(values) {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {
          email: values.email,
          newPassword: values.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUserMessage('Password reset successfully.');
      navigate('/login'); // Navigate to another page if the password is successfully reset
    } catch (error) {
      console.error('Error during reset:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-32 container mx-auto px-5">
      <h1 className="text-main text-2xl">Enter New Password</h1>
      <h4>(valid for 10 minutes)</h4>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {error}
        </div>
      )}

      {userMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="my-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="my-2">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
          <input
            name="newPassword"
            type="password" // Use 'password' to hide input text
            id="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-end my-5">
            {isLoading ? (
              <button
                type="submit"
                className="bg-main text-white px-5 py-2 rounded-lg"
                disabled
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="bg-main text-white px-5 py-2 rounded-lg"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
