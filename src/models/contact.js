const mongodb = require('../routes/data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => {
  const result = await mongodb.getDatabase().collection('users').find();
  return result.toArray();
};

const getUserById = async (id) => {
  const userId = new ObjectId(id);
  const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
  const users = await result.toArray();
  return users[0];
};

const createUser = async (user) => {
  return await mongodb.getDatabase().collection('users').insertOne(user);
};

const updateUser = async (id, user) => {
  const userId = new ObjectId(id);
  return await mongodb.getDatabase().collection('users').replaceOne(
    { _id: userId },
    user
  );
};

const deleteUser = async (id) => {
  const userId = new ObjectId(id);
  return await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};