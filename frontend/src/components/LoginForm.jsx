import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const loginFunctionality = async (formData, navigate) => {
  const { username, password } = formData;
  const LOGIN_API = "http://localhost:3000/api/v1/login";

  try {
    console.log("Login Payload:", { username, password });

    const response = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("LOGIN API RESPONSE:", data);

    if (!data.success) {
      throw new Error(data.message);
    }

    localStorage.setItem("username", username);
    navigate("/dashboard");
  } catch (error) {
    console.log("Login API Error:", error.message || error);
  }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFunctionality(formData, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <label className="block mb-4">
          <p className="text-gray-700">Username:</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4">
          <p className="text-gray-700">Password:</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </label>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
