const express = require('express');
const bookControllers = require('../controllers/bookControllers');
const {authenticateUser, checkAdmin} = require('../middleware/authentication');

const router = express.Router();


router.post('/books', authenticateUser, checkAdmin, bookControllers.createNewBook);

router.get('/books', authenticateUser, bookControllers.fetchBooks);

router.get('/books/:id', authenticateUser, bookControllers.fetchBookById);

router.get('/books/:query', authenticateUser, bookControllers.fetchBookByParameter);

router.put('/books/:id', authenticateUser, checkAdmin, bookControllers.updateBookById);

router.delete('/books/:id', authenticateUser, checkAdmin, bookControllers.deleteBookById);

module.exports = router;