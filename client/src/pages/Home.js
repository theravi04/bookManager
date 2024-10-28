// Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../middleware/AuthContext.js";
import Description from "./Description";
import { HomeIcon, Book, Users, BookOpen, LogOut } from "lucide-react";

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Get the login state from context

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("You have logged out successfully.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <HomeIcon className="mr-3 h-10 w-10 text-blue-600" /> Library Management System
          </h1>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 flex items-center px-4 py-2 rounded-md border border-red-500 hover:border-red-600 transition duration-150"
            >
              <LogOut className="inline-block mr-2 h-6 w-6" /> Logout
            </button>
          ) : (
            <div className="space-x-4 flex">
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 flex items-center px-4 py-2 rounded-md border border-blue-500 hover:border-blue-600 transition duration-150"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-600 flex items-center px-4 py-2 rounded-md border border-blue-500 hover:border-blue-600 transition duration-150"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center sm:justify-start space-x-6">
            <li>
              <Link to="/books" className="flex items-center text-gray-700 hover:text-gray-800">
                <Book className="inline-block mr-2 h-6 w-6 text-gray-600" /> View Books
              </Link>
            </li>
            <li>
              <Link to="/allusers" className="flex items-center text-gray-700 hover:text-gray-800">
                <Users className="inline-block mr-2 h-6 w-6 text-gray-600" /> View Users
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="flex items-center text-gray-700 hover:text-gray-800">
                <BookOpen className="inline-block mr-2 h-6 w-6 text-gray-600" /> Book Transactions
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/userpage" className="flex items-center text-green-600 hover:text-green-700">
                  Go to User Page
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Description />
      </div>
    </div>
  );
}

export default Home;
