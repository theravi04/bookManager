require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// for user related routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// for book related routes
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// for transaction related routes
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
