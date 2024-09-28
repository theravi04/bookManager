import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const Transactions = () => {
  const [queryType, setQueryType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    try {
      let response;

      // book history
      if (queryType === "bookHistory") {
        try {
          response = await axiosInstance.get(
            `/transactions/book/${encodeURIComponent(inputValue)}`
          ); // Encoded URL
        } catch (error) {
          console.error(
            "Error fetching book data:",
            error.response ? error.response.data : error.message
          );
        }
      }

      // book rent
      else if (queryType === "bookRent") {
        try {
          response = await axiosInstance.get(
            `/transactions/book/rent/${encodeURIComponent(inputValue)}`
          );
        } catch (error) {
          console.error(
            "Error fetching book data - bookRent:",
            error.response ? error.response.data : error.message
          );
        }
      }

      // user books
      else if (queryType === "userBooks") {
        try {
          response = await axiosInstance.get(`/transactions/user/${inputValue}`);
        } catch (error) {
          console.error(
            "Error fetching book data - userBooks:",
            error.response ? error.response.data : error.message
          );
        }
      } 
      
      // in date range
      else if (queryType === "dateRange") {
        try {
          response = await axiosInstance.get(
            `/transactions/date-range?startDate=${startDate}&endDate=${endDate}`
          );
        } catch (error) {
          console.error(
            "Error fetching book data - dateRange:",
            error.response ? error.response.data : error.message
          );
        }
      }
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="mb-4">
        <label className="mr-2">Select Query Type:</label>
        <select
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
          className="border p-2"
        >
          <option value="">Select...</option>
          <option value="bookHistory">Book History & Current Status</option>
          <option value="bookRent">Total Rent Generated by Book</option>
          <option value="userBooks">Books Issued to User</option>
          <option value="dateRange">Books Issued in Date Range</option>
        </select>
      </div>

      {(queryType === "bookHistory" ||
        queryType === "bookRent" ||
        queryType === "userBooks") && (
        <div className="mb-4">
          <label className="mr-2">
            Enter {queryType === "userBooks" ? "User ID" : "Book Name"}:
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2"
          />
        </div>
      )}

      {queryType === "dateRange" && (
        <div className="mb-4">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 mr-4"
          />
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2"
          />
        </div>
      )}

      <button
        onClick={handleQuery}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Execute Query
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Results:</h3>
          <pre className="bg-gray-100 p-4 mt-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Transactions;