const express = require('express');
const passport = require('passport'); 
const router = express.Router();
const User = require('../models/user.cjs');

// Passport authentication middleware
router.use(authenticate('jwt', { session: false }));

// GET all users (protected route)
router.get('/', async (req, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single user by ID (protected route)
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// CREATE a new user (protected route)
router.post('/', async (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = new User(req.body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a user (protected route)
router.patch('/:id', getUser, async (req, res) => {
  // Check if the authenticated user is an admin or the owner of the user being updated
  if (req.user.role !== 'admin' && req.user._id.toString() !== res.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Update the user fields
  Object.assign(res.user, req.body);
  
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user (protected route)
router.delete('/:id', getUser, async (req, res) => {
  // Check if the authenticated user is an admin or the owner of the user being deleted
  if (req.user.role !== 'admin' && req.user._id.toString() !== res.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;

