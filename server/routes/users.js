const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: 'Name, email, and password are required.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is already registered.' });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      membershipDate: new Date(),
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User has been registered' });
  } catch (error) {
    next(error);
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }

    // Compare passwords
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: 'Wrong password.' });
    }

    // If login is successful, send back user info
    res.status(200).json({
      success: true,
      message: 'User has been logged in successfully',
      userId: user._id, // Include userId in the response
      email: user.email, // Include email (or any other user info you need)
    });
  } catch (error) {
    next(error);
  }
});


// get one user
// Get a particular user by ID
router.get('/particular/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter
    
    // Validate input
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});


// Get all users
router.get('/all', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
