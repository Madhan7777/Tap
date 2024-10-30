import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showMasked, setShowMasked] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let intervalId;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];

    if (value.length <= 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5 && value) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }

    if (e.key === 'Backspace' && !value) {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const sendOtp = async () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await axios.post('http://localhost:3007/otps', { otp: generatedOtp });
    console.log(`Generated OTP: ${generatedOtp}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length < 6) {
      setMessage('Please enter the full OTP.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3007/otps');
      const otps = response.data;
      const isValid = otps.some(entry => entry.otp === otpCode);

      if (isValid) {
        setMessage('OTP verified successfully!');
        setOtp(['', '', '', '', '', '']); // Clear OTP input
        navigate('/confirmpassword');
      } else {
        setMessage('Invalid OTP. Please try again.');
        setIsResendEnabled(true);
      }
    } catch (error) {
      setMessage('Error verifying OTP. Please try again.');
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    await sendOtp();
    setMessage('OTP has been resent to your email.');
    setOtp(['', '', '', '', '', '']); // Clear OTP input
    setTimer(30);
    setIsResendEnabled(false);
    startTimer();
    setIsLoading(false);
  };

  const startTimer = () => {
    clearInterval(intervalId);
    setTimer(30);
    intervalId = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsResendEnabled(true); // Enable resend button
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    sendOtp();
    startTimer();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEEEEE]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h2>
        <p className="text-center text-[#27235C] mb-4">Please enter the OTP sent to your email.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={showMasked && digit ? '*' : digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleChange(e, index)}
                className={`shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${index === 5 ? 'mr-0' : 'mr-2'} ${digit ? 'border-blue-500' : 'border-gray-300'}`}
                maxLength="1"
                autoComplete="off"
                onFocus={() => setShowMasked(true)}
                onBlur={() => setShowMasked(false)}
              />
            ))}
          </div>
          {message && (
            <p className={`text-xs italic mb-2 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className={`bg-[#27235C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <span className="text-[#27235C]">{timer > 0 ? `Resend OTP in ${timer}s` : 'OTP expired'}</span>
          <button
            onClick={handleResend}
            className={`bg-[#27235C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${!isResendEnabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isResendEnabled || isLoading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
