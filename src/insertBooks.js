require('dotenv').config();
const { MongoClient } = require('mongodb');

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    isbn: "978-0-7432-7356-5"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    isbn: "978-0-0613-5461-8"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    isbn: "978-0-4521-0425-3"
  }
];

async function insertBooks() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db('Project2');
    const result = await db.collection('books').insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted successfully!`);
    await client.close();
  } catch (err) {
    console.error('Error inserting books:', err);
  }
}

insertBooks();