import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBookName, setSelectedBookName] = useState('');
  // const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToIssue, setBookToIssue] = useState(null); // Book to be issued

  useEffect(() => {
    // Fetch all books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books/all'); 
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.response ? error.response.data : error.message);
      }
    };

    // Fetch all users for issuing books
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
            issueDate: new Date(), // issueDate is current date
        });
        alert('Book issued successfully!');
        // setSelectedBookId('');
        setSelectedUserId('');
        setIsModalOpen(false); // Close modal after issuing
    } catch (error) {
        console.error('Error issuing book:', error.response ? error.response.data : error.message);
        alert('Failed to issue the book: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const openModal = (book) => {
    console.log(book);
    
    setBookToIssue(book);
    setSelectedBookName(book.bookName);
    // setSelectedBookId(book._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookName('');
    // setSelectedBookId('');
    setSelectedUserId('');
    setBookToIssue(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Books List</h2>

      {books.length > 0 ? (
        <div className="mb-6">
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book._id} className="border border-gray-300 p-4 rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <strong>{book.bookName}</strong>
                    <p>Category: {book.category}</p>
                    <p>Rent Per Day: ${book.rentPerDay}</p>
                  </div>
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={() => openModal(book)}
                  >
                    Issue
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No books available.</p>
      )}

      {/* Modal for issuing books */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Issue Book</h2>
            {bookToIssue && (
              <div>
                <p><strong>Book:</strong> {bookToIssue.bookName}</p>
                <p><strong>Category:</strong> {bookToIssue.category}</p>
                <p><strong>Rent Per Day:</strong> ${bookToIssue.rentPerDay}</p>
              </div>
            )}
            <label className="mr-2">Select User to Issue:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border p-2 mb-4 w-full"
            >
              <option value="">Select User...</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button onClick={handleIssueBook} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
                Confirm Issue
              </button>
              <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksList;
