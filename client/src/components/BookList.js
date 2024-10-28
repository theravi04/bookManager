import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { User, BookOpen, XCircle, CheckCircle } from 'lucide-react';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBookName, setSelectedBookName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToIssue, setBookToIssue] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books/all'); 
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.response ? error.response.data : error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/all'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const handleIssueBook = async () => {
    if (!selectedUserId) {
      alert('Please select a user to issue the book.');
      return;
    }

    try {
      await axiosInstance.post('/transactions/issue', {
        bookName: selectedBookName,
        userId: selectedUserId,
        issueDate: new Date(),
      });
      alert('Book issued successfully!');
      setSelectedUserId('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error issuing book:', error.response ? error.response.data : error.message);
      alert('Failed to issue the book: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const openModal = (book) => {
    setBookToIssue(book);
    setSelectedBookName(book.bookName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookName('');
    setSelectedUserId('');
    setBookToIssue(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Books List</h2>

      {books.length > 0 ? (
        <div className="grid gap-6 mb-6 sm:grid-cols-1 md:grid-cols-2">
          {books.map((book) => (
            <div key={book._id} className="border border-gray-300 p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {book.bookName}
                  </h3>
                  <p className="text-sm text-gray-600">Category: {book.category}</p>
                  <p className="text-sm text-gray-600">Rent Per Day: ${book.rentPerDay}</p>
                </div>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded flex items-center"
                  onClick={() => openModal(book)}
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Issue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Issue Book</h2>
            {bookToIssue && (
              <div className="mb-4">
                <p className="text-gray-700"><strong>Book:</strong> {bookToIssue.bookName}</p>
                <p className="text-gray-700"><strong>Category:</strong> {bookToIssue.category}</p>
                <p className="text-gray-700"><strong>Rent Per Day:</strong> ${bookToIssue.rentPerDay}</p>
              </div>
            )}
            <label className="text-gray-700">Select User to Issue:</label>
            <div className="flex items-center mt-2 mb-4">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="">Select User...</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={handleIssueBook} className="bg-green-500 text-white py-2 px-4 rounded flex items-center">
                <CheckCircle className="mr-1 h-5 w-5" /> Confirm Issue
              </button>
              <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded flex items-center">
                <XCircle className="mr-1 h-5 w-5" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksList;
