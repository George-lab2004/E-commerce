import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';

export default function ResetCode() {
  const [userMessage, setUserMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .matches(/^\d+$/, 'Code must be a number')
      .min(4, 'Code must be at least 4 digits')
      .max(6, 'Code must be at most 6 digits'),
  });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => ResetCode(values),
  });

  async function ResetCode(values) {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { resetCode: values.code }, // Ensure the correct key is used
        {
          headers: {
            'Content-Type': 'application/json', // Correct content type
          },
        }
      );
      console.log(response.data);
      setUserMessage('Code verified successfully.');
      navigate('/update'); // Navigate to another page if the code is valid
    } catch (error) {
      console.error('Error during reset:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-32 container mx-auto px-5">
      <h1 className='text-main text-2xl'>Enter code sent ur gmail </h1>
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
        <div className='my-2'>
          <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
          <input
            name='code'
            type="text" // Use 'text' for the input type
            id="code"
            onChange={formik.handleChange}
            value={formik.values.code}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {formik.touched.code && formik.errors.code ? (
            <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
              {formik.errors.code}
            </div>
          ) : null}
        </div>

        <div className='flex items-center justify-between'>
          <div className='text-end my-5'>
            {isLoading ? (
              <button
                type='submit'
                className='bg-main text-white px-5 py-2 rounded-lg'
                disabled
              >
                <i className='fa fa-spinner fa-spin'></i> 
              </button>
            ) : (
              <button
                type='submit'
                className='bg-main text-white px-5 py-2 rounded-lg'
                disabled={!(formik.isValid && formik.dirty)}
              >
                Verify
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
