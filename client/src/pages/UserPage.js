import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosConfig";
import { AuthContext } from "../middleware/AuthContext";

const UserPage = () => {
  const { userId } = useContext(AuthContext); // Assuming userId is stored in AuthContext
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axiosInstance.get(`/transactions/user/${userId}`);
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching user books:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserBooks();
  }, [userId]);

  // Function to handle book return
  const handleReturnBook = async (bookId) => {
    console.log(bookId);

    try {
      const returnDate = new Date().toISOString();
      const response = await axiosInstance.post(`/transactions/return`, {
        bookId: bookId, 
        userId: userId,
        returnDate: returnDate,
      });
      
      alert(response.data.message);
      const totalRent = response.data.totalRent || 0; 
      
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, totalRent: totalRent, status: 'Returned' } : book
        )
      );

    } catch (error) {
      console.error("Error returning book:", error.response ? error.response.data : error.message);
      alert("Failed to return the book.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Issued Books</h2>

      {books.length === 0 ? (
        <p>No books issued to you.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{book.bookId.bookName}</h3>
              <p className="text-sm text-gray-600">Issued on: {new Date(book.issueDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Status: {book.status}</p>
              <p className="text-sm text-gray-600">Rent: ${book.totalRent || 0} (- updated after return)</p>
              
              {book.status === 'Issued' && (
                <button
                  onClick={() => handleReturnBook(book.bookId._id)}
                  className="mt-2 w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Return Book
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
