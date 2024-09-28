const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// add books
router.post("/addBook", async (req, res) => {
  const { bookName, category, rentPerDay } = req.body;

  if (!bookName || !category || !rentPerDay) {
    return res
      .status(400)
      .json({ message: "Please provide bookName, category, and rentPerDay" });
  }

  try {
    // Check if the book already exists
    let existingBook = await Book.findOne({ bookName });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new Book({
      bookName,
      category,
      rentPerDay,
    });

    const savedBook = await newBook.save();

    return res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error adding book:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get books by name/term
router.get("/search", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide a name or term to search" });
  }

  try {
    const books = await Book.find({ bookName: new RegExp(name, "i") });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get books by rent price range
router.get("/rent", async (req, res) => {
  const { minRent, maxRent } = req.query;

  if (minRent === undefined || maxRent === undefined) {
    return res
      .status(400)
      .json({ message: "Please provide minRent and maxRent" });
  }

  try {
    const books = await Book.find({
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get books by category, name/term, and rent per day range
router.get("/filter", async (req, res) => {
  const { category, name, minRent, maxRent } = req.query;

  try {
    let query = {};

    if (category) {
      query.category = category;
    }

    if (name) {
      query.bookName = new RegExp(name, "i");
    }

    if (minRent !== undefined && maxRent !== undefined) {
      query.rentPerDay = { $gte: minRent, $lte: maxRent };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all books
router.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
