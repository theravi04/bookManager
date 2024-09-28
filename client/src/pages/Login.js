import React, { useState, useContext } from 'react';
import { AuthContext } from '../middleware/AuthContext'; 
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, setUserId } = useContext(AuthContext); // Get setUserId function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      console.log(response);
      
      if (response.data.success) {
        setIsLoggedIn(true); // Update login state on success
        setUserId(response.data.userId); // Set userId in context
        alert(response.data.message);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
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
          onClick={handleLogin}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <div className="text-sm text-center">
          <p>
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
