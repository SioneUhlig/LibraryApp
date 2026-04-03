const Book = require('../models/book');

const getAll = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const books = await Book.getAllBooks();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving books.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving book.' });
  }
};

const createBook = async (req, res) => {
  //#swagger.tags=['Books']
  const { title, author, genre, publishedYear, isbn } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string.' });
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ error: 'author is required and must be a non-empty string.' });
  }
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    return res.status(400).json({ error: 'genre is required and must be a non-empty string.' });
  }
  if (!publishedYear || isNaN(Number(publishedYear))) {
    return res.status(400).json({ error: 'publishedYear is required and must be a number.' });
  }
  if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
    return res.status(400).json({ error: 'isbn is required and must be a non-empty string.' });
  }

  try {
    const book = { title, author, genre, publishedYear: Number(publishedYear), isbn };
    const result = await Book.createBook(book);
    if (result.insertedId) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the book.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while creating the book.' });
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const { title, author, genre, publishedYear, isbn } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string.' });
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ error: 'author is required and must be a non-empty string.' });
  }
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    return res.status(400).json({ error: 'genre is required and must be a non-empty string.' });
  }
  if (!publishedYear || isNaN(Number(publishedYear))) {
    return res.status(400).json({ error: 'publishedYear is required and must be a number.' });
  }
  if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
    return res.status(400).json({ error: 'isbn is required and must be a non-empty string.' });
  }

  try {
    const book = { title, author, genre, publishedYear: Number(publishedYear), isbn };
    const result = await Book.updateBook(req.params.id, book);
    if (result.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while updating the book.' });
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const result = await Book.deleteBook(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while deleting the book.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};