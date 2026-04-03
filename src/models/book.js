const mongodb = require('../routes/data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async () => {
  const result = await mongodb.getDatabase().collection('books').find();
  return result.toArray();
};

const getBookById = async (id) => {
  const bookId = new ObjectId(id);
  const result = await mongodb.getDatabase().collection('books').find({ _id: bookId });
  const books = await result.toArray();
  return books[0];
};

const createBook = async (book) => {
  return await mongodb.getDatabase().collection('books').insertOne(book);
};

const updateBook = async (id, book) => {
  const bookId = new ObjectId(id);
  return await mongodb.getDatabase().collection('books').replaceOne(
    { _id: bookId },
    book
  );
};

const deleteBook = async (id) => {
  const bookId = new ObjectId(id);
  return await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};