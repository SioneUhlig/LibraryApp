require('dotenv').config();
const { MongoClient } = require('mongodb');

const sampleContacts = [
  {
    firstName: "Sione",
    lastName: "Uhlig",
    username: "Usione",
    email: "sione@example.com",
    favoriteColor: "blue",
    birthDay: "April 17, 1993"
  },
  {
    firstName: "Jane",
    lastName: "Walz",
    username: "Jwalz",
    email: "jane@example.com",
    favoriteColor: "green",
    birthDay: "September 2, 2001"
  },
  {
    firstName: "Bob",
    lastName: "Miller",
    username: "Mbob",
    email: "bob@example.com",
    favoriteColor: "red",
    birthDay: "January 29, 1987"
  }
];

async function insertContacts() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db('Project2');
    const result = await db.collection('contacts').insertMany(sampleContacts);
    console.log(`${result.insertedCount} contacts inserted successfully!`);
    await client.close();
  } catch (err) {
    console.error('Error inserting contacts:', err);
  }
}

insertContacts();