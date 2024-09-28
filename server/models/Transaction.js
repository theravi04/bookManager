const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number },
    status: { type: String, enum: ['Issued', 'Returned'], required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
