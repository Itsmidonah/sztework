const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const passport = require('passport'); // Import passport for authentication

// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new product (protected route, only accessible by admins)
router.post('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Check if user is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    // Create a new product using the static method
    const newProduct = await Product.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product (protected route, only accessible by admins)
router.patch('/products/:productId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Check if user is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product (protected route, only accessible by admins)
router.delete('/products/:productId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Check if user is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
