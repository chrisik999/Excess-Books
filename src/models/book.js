const mongoose = require('mongoose');

//Create Schema
const bookSchema = new mongoose.Schema({
    title: {type: String,
    required: true},
    author: {type: String,
    required: true},
    description: {type: String},
    category: {type: String,
    required: true},
    purchaseaCount: Number,
    imageUri: String,
    tags: Array
})

//Create Model
const Book = new mongoose.model('Book',bookSchema);

module.exports = Book;