import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../middleware/AuthContext.js";

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Get the login state from context

  const handleLogout = () => {
    setIsLoggedIn(false); 
    alert("You have logged out successfully.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Library Management System
      </h1>

      <div className="flex space-x-6 mb-6">
        <Link to="/books" className="text-black hover:text-blue-500">
          View Books
        </Link>
        <Link to="/allusers" className="text-black hover:text-blue-500">
          View Users
        </Link>
        <Link to="/transactions" className="text-black hover:text-blue-500">
          Book Transactions
        </Link>
      </div>

      <div className="flex flex-col items-center">
        {!isLoggedIn ? ( 
          <div className="flex space-x-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </div>
        ) : ( 
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        )}

        {isLoggedIn && ( 
          <Link to="/userpage" className="text-green-600 hover:text-green-800">
            Go to User Page
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
