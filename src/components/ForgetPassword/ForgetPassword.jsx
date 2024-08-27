import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mySchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
  });

  async function Reset(values) {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );
      console.log(response.data);
      console.log('Email User Data:', values);
      // Navigate to another page if the email is valid and the API call is successful
      navigate('/Code');
    } catch (error) {
      console.error('Error during reset:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-20 container mx-auto px-5">
      <h1 className="text-main text-2xl">Enter your email</h1>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={mySchema}
        onSubmit={(values) => Reset(values)}
      >
        {({ handleChange, values, handleBlur }) => (
          <Form>
            <div className="my-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              />
            </div>

            <button
              type="submit"
              className="bg-main text-white rounded-lg px-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Proceed'}
            </button>

            {/* Conditionally render the error message */}
            {error && (
              <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                invalid email
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}