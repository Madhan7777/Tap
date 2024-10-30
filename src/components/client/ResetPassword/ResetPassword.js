import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const passwordStrength = (password) => {
  let score = 0;
  const passwordMinLength = 8;

  if (password.length >= passwordMinLength) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  return score;
};

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      // Fetch existing user from JSON server (Assuming user ID is 1)
      const response = await axios.get('http://localhost:3007/users/1');
      const user = response.data;

      // Verify old password
      if (oldPassword !== user.password) {
        setError('Old password is incorrect.');
        return;
      }

      // Check if new password is the same as old password
      if (newPassword === oldPassword) {
        setError("You can't keep your old password as the new password.");
        return;
      }

      // Validate new password confirmation
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match.');
        return;
      }

      // Update password in JSON server
      await axios.patch(`http://localhost:3007/users/1`, { password: newPassword });

      setMessage('Password reset successfully! You can log in with your new password.');
      navigate('/success'); // Redirect to a success page
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    setStrength(passwordStrength(newPassword));
  }, [newPassword]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEEEEE]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#27235C]">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#27235C] text-sm font-bold mb-2" htmlFor="oldPassword">
              Enter Your Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#27235C] hover:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#27235C] text-sm font-bold mb-2" htmlFor="newPassword">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#27235C] hover:border-blue-700"
            />
            {newPassword && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      strength === 0 ? 'bg-transparent' :
                      strength === 1 ? 'bg-red-500' :
                      strength === 2 ? 'bg-yellow-500' :
                      strength >= 3 ? 'bg-green-500' : 'bg-green-500'
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
          </div>
          <div className="mb-4">
            <label className="block text-[#27235C] text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#27235C] hover:border-blue-700"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          {message && <p className="text-green-500 text-xs italic mb-2">{message}</p>}
          <button
            type="submit"
            className="bg-[#27235C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
