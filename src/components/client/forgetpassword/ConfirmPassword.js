import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  // Function to calculate password strength
  const calculateStrength = (password) => {
    let score = 0;
    const passwordMinLength = 8;

    if (password.length >= passwordMinLength) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    setStrength(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate inputs
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      setError('Please fill out both fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Please recheck the passwords you entered.');
      return;
    }

    // Password validation
    const passwordMinLength = 8;
    if (newPassword.length < passwordMinLength) {
      setError(`Password must be at least ${passwordMinLength} characters long.`);
      return;
    }

    if (strength < 3) {
      setError('Password must include a mix of uppercase, lowercase, numbers, and special characters.');
      return;
    }

    // Success message and redirection
    setMessage('Your new password has been created!');
    
    // Optional: Redirect after a delay
    setTimeout(() => {
      navigate('/success'); // Replace with your desired route
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEEEEE]">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#27235C]">Create New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#27235C] text-sm font-bold mb-2" htmlFor="newPassword">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                calculateStrength(e.target.value);
              }}
              placeholder="Enter new password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#27235C] hover:border-blue-700 transition duration-200"
            />
          </div>
          {newPassword && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    strength === 0 ? 'bg-transparent' :
                    strength === 1 ? 'bg-red-500' :
                    strength === 2 ? 'bg-yellow-500' :
                    strength >= 3 ? 'bg-green-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#27235C] mt-1">
                {strength === 0 ? 'Very Weak' :
                 strength === 1 ? 'Weak' :
                 strength === 2 ? 'Fair' :
                 strength === 3 ? 'Good' :
                 'Strong'}
              </p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-[#27235C] text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#27235C] hover:border-blue-700 transition duration-200"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          {message && <p className="text-green-500 text-xs italic mb-2">{message}</p>}
          <button
            type="submit"
            className="bg-[#27235C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
