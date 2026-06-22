import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
// useSearchParams and Link should come from react-router-dom
import { Link, useSearchParams } from 'react-router'
import { IoBagCheckOutline } from 'react-icons/io5'
import RevealArise from '../../components/Animation/RevealArise';


const PaymentSuccess = () => {
   const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      // notify backend of successful session; log result for debugging
      axios
        .post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
        .then((res) => console.log('payment-success response', res.data))
        .catch((err) => console.error('payment-success error', err.response || err))
    }
  }, [sessionId])
  return (
   <RevealArise>
     <div className='flex flex-col items-center justify-center mt-5'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
        <IoBagCheckOutline className='w-16 h-16 text-primary mx-auto mb-4' />
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Payment Successful!
        </h1>
        <p className='text-gray-600 mb-6'>
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link
          to='/dashboard/my-orders'
          className='inline-block bg-green-400 text-white font-semibold py-2 px-4 rounded hover:bg-primary transition duration-300'
        >
          Go to My Orders
        </Link>
      </div>
    </div>
   </RevealArise>
  )
};

export default PaymentSuccess;