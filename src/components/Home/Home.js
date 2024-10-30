import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="space-y-4">
        <Link to="/forgetpassword" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ForgetPassword
        </Link>
        <Link to="/resetpassword" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          ResetPassword
        </Link>
        <Link to="/candidatetable" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Candidate
        </Link>
      </div>
    </div>
  );
}

export default HomePage;