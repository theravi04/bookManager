import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import AllUsers from './pages/AllUsers';
import Transaction from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
