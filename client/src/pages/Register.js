import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post('/users/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate('/login'); 
      }
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
        <div className="text-sm text-center">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
