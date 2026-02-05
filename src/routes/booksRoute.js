const express = require('express');
const router = express.Router();

// local database
let books = [
  {
    id: 1,
    name: 'Book One',
    author: 'Author One',
  },
  {
    id: 2,
    name: 'Book Two',
    author: 'Author Two',
  },
  {
    id: 3,
    name: 'Book Three',
    author: 'Author Three',
  },
];

// view all books
router.get('/', (req, res) => {
  res.status(200).json(books);
});

// post new book
router.post('/', (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json({
    message: 'Book added',
    newBook: newBook,
    totalBooks: books.length,
  });
});

// view single book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => {
    return book.id === parseInt(id);
  });
  res.status(200).json(book);
});

// update a book
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => {
    return book.id === parseInt(id);
  });
  if (!book) return res.status(404).json({ message: 'Book not found!' });
  Object.assign(book, req.body);
  res.status(200).json({
    message: 'Book updated successfully',
    updatedBook: book,
  });
});

// delete a book
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter((book) => {
    return book.id != parseInt(id);
  });
  res.json({ message: 'Book deleted.', allBooks: books });
});

module.exports = router;
