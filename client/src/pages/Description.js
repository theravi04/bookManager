// Description.js
import React from 'react';
import { Book, Users, Calendar, ListChecks, Award } from 'lucide-react';

const Description = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Library Management System Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
        <div className="flex items-start space-x-4">
          <Book className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Browsing and Search</h3>
            <p className="text-sm">
              Easily search for books by name, category, or price range. Find books by keywords to get the exact match or similar options.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Users className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">User and Book Listings</h3>
            <p className="text-sm">
              Access a list of all users and books, making it easy to view or manage library members and available books.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Calendar className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Transaction Management</h3>
            <p className="text-sm">
              Keep track of book issues and returns. Every transaction is stored with dates, and current availability is updated automatically.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <ListChecks className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rent Calculation</h3>
            <p className="text-sm">
              When a book is returned, the system calculates the total rent based on the issue and return dates.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Book className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Transaction Records</h3>
            <p className="text-sm">
              View detailed histories, such as a book's past issuances, the current user holding it, and the total revenue generated per book.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Award className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">User Activity</h3>
            <p className="text-sm">
              Check which books are currently issued to a specific user or find books issued within a specific date range for better management insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
