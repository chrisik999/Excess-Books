const Book = require('../models/book');

exports.createNewBook = (req, res) => {

        const book = req.body;
        Book.create({ 
            ...req.body
            // title: book.title,
            // author: book.author,
            // description: book.description,
            // category: book.category,
            // purchaseaCount: book.purchaseaCount,
            // imageUri: book.imageUri,
            // tags: book.tags
        }, (err, newBook) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({message: 'Internal server error', error: err.message});
            } else{
                return res.status(201).json({message: 'new book created', book: newBook});
            }
        })
    
    }

exports.fetchBooks = (req,res) => {
    let conditions = {};
    if(req.query.category){
        conditions.category = req.query.category;
    }
    if(req.query.author){
        conditions.author = req.query.author;
    }
    Book.find(conditions, (err, books) => {
        if(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error', error: err.message});
        } else{
            return res.status(200).json({message: 'success', books: books});
        }
    })
}

exports.fetchBookById = (req, res) => {
        Book.findOne({ _id: req.params.id }, (err, book) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: 'Internal server error', error: err.message});
            } else if(!book){
                return res.status(404).json({message: 'Book not found'});
            } else{
                return res.status(200).json({message: 'success', book: book});
            }
        })
} 

exports.fetchBookByParameter = (req, res) => {
        Book.findOne({ _id: req.params.id }, (err, book) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: 'Internal server error', error: err.message});
            } else if(!book){
                return res.status(404).json({message: 'Book not found'});
            } else{
                return res.status(200).json({message: 'success', book: book});
            }
        }) 
}

exports.updateBookById = (req, res) => {
        Book.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            category: req.body.category
        }, (err, book) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message: 'Internal Server Error', error: err});
            } else if(!book) {
                return res.status(404).json({message: 'Book not found'});
            } else {
                return res.status(200).json({message: 'Book successfully updated'  });
            }
        })
}

exports.deleteBookById = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: 'Internal server error', error: err.message});
        }else if (!book){
            res.status(404).json({message: 'Book not found'});
        } else{
            return res.status(200).json({message: 'Book successfully deleted'});
        }
    })
}

