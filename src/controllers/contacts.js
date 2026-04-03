const User = require('../models/contact');

const getAll = async (req, res) => {
  //#swagger.tags=['Library Users']
  try {
    const users = await User.getAllUsers();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving library users.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Library Users']
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Library user not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving library user.' });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=['Library Users']
  const { firstName, lastName, email, membershipType, phone, joinDate, birthday } = req.body;

  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    return res.status(400).json({ error: 'firstName is required and must be a non-empty string.' });
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    return res.status(400).json({ error: 'lastName is required and must be a non-empty string.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!membershipType || typeof membershipType !== 'string' || membershipType.trim() === '') {
    return res.status(400).json({ error: 'membershipType is required (e.g. standard, premium, student).' });
  }
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    return res.status(400).json({ error: 'phone is required and must be a non-empty string.' });
  }
  if (!joinDate || typeof joinDate !== 'string' || joinDate.trim() === '') {
    return res.status(400).json({ error: 'joinDate is required and must be a non-empty string.' });
  }
  if (!birthday || typeof birthday !== 'string' || birthday.trim() === '') {
    return res.status(400).json({ error: 'birthday is required and must be a non-empty string.' });
  }

  try {
    const user = { firstName, lastName, email, membershipType, phone, joinDate, birthday };
    const result = await User.createUser(user);
    if (result.insertedId) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the library user.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while creating the library user.' });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Library Users']
  const { firstName, lastName, email, membershipType, phone, joinDate, birthday } = req.body;

  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    return res.status(400).json({ error: 'firstName is required and must be a non-empty string.' });
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    return res.status(400).json({ error: 'lastName is required and must be a non-empty string.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!membershipType || typeof membershipType !== 'string' || membershipType.trim() === '') {
    return res.status(400).json({ error: 'membershipType is required (e.g. standard, premium, student).' });
  }
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    return res.status(400).json({ error: 'phone is required and must be a non-empty string.' });
  }
  if (!joinDate || typeof joinDate !== 'string' || joinDate.trim() === '') {
    return res.status(400).json({ error: 'joinDate is required and must be a non-empty string.' });
  }
  if (!birthday || typeof birthday !== 'string' || birthday.trim() === '') {
    return res.status(400).json({ error: 'birthday is required and must be a non-empty string.' });
  }

  try {
    const user = { firstName, lastName, email, membershipType, phone, joinDate, birthday };
    const result = await User.updateUser(req.params.id, user);
    if (result.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Library user not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while updating the library user.' });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Library Users']
  try {
    const result = await User.deleteUser(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Library user not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while deleting the library user.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};