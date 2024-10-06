import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Welcome to Our Application!</h2>
      <p className="text-lg text-gray-700 mb-8">
        This is the home page where you can find the best features of our platform.
      </p>
      <button 
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
