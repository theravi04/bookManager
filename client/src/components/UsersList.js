import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users and their transactions from the backend
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/all');
        const usersData = await Promise.all(
          response.data.map(async (user) => {
            const transactionsResponse = await axiosInstance.get(`/transactions/user/${user._id}`);
            return { ...user, transactions: transactionsResponse.data };
          })
        );
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="border border-gray-300 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p>Email: {user.email}</p>

              {user.transactions.length > 0 ? (
                <div className="mt-2">
                  <h4 className="font-semibold">Books Issued:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {user.transactions.map((transaction) => (
                      <li key={transaction._id}>
                        <strong>{transaction.bookId.bookName}</strong> - 
                        {transaction.totalRent ? (
                          <>
                          - Rent: ${transaction.totalRent} - 
                          </>
                        )
                        : (
                          <>- Book not Returned -</>
                        )
                        }
                        - Issued on: {new Date(transaction.issueDate).toLocaleDateString()} - 
                        {transaction.returnDate ? (
                          <> Returned on: {new Date(transaction.returnDate).toLocaleDateString()} -</>
                        ) : (
                          <>- Currently with the user -</>
                        )}
                        - Status: {transaction.status}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2">No books issued.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersList;
