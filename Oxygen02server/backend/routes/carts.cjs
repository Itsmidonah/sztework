const express = require('express');
const router = express.Router();
const passport = require('../passport'); // Require your Passport configuration
const Cart = require('../models/cart.cjs');

// GET all carts (protected route)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single cart by ID (protected route)
router.get('/:id', passport.authenticate('jwt', { session: false }), getCart, (req, res) => {
  res.json(res.cart);
});

// CREATE a new cart (protected route)
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const cart = new Cart(req.body);

  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a cart (protected route)
router.patch('/:id', passport.authenticate('jwt', { session: false }), getCart, async (req, res) => {
  try {
    const updatedCart = await res.cart.set(req.body).save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a cart (protected route)
router.delete('/:id', passport.authenticate('jwt', { session: false }), getCart, async (req, res) => {
  try {
    await res.cart.remove();
    res.json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get cart by ID
async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.cart = cart;
  next();
}

module.exports = router;
