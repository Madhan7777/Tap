import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import axios from 'axios';
import { setEmail } from '../../../redux/actions/EmailActions';

const ForgotPassword = () => {
  const [email, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('http://localhost:3007/reset-password', { email });
      setMessage('A reset link has been sent to your email address.');

      // Dispatch the email to Redux store
      dispatch(setEmail(email));

      navigate('/otp');
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.');
      console.error('Error sending reset link:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/resetpassword');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEEEEE] p-4">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center text-[#27235C]">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">We will email you the OTP to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              className={`shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${error ? 'border-red-500' : 'border-gray-300'}`}
              required
              aria-describedby="emailHelp"
            />
            {error && <p className="text-red-500 text-xs italic mt-1 transition-opacity duration-300">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#27235C] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full"
          >
            Send OTP
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center transition-opacity duration-300 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        {/* <div className="mt-4 text-center">
          <button
            onClick={handleNavigate}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Reset Password
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
