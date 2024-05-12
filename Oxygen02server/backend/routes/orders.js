/*import { Router } from 'express';
const router = Router();
import passport from '../passport'; // Import passport configuration
import Order, { find, findById } from '../models/order';
//import Order from '../models/order'; // Import your Mongoose Order model or????


// GET all orders (protected route)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const orders = await find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single order by ID (protected route)
router.get('/:id', passport.authenticate('jwt', { session: false }), getOrder, (req, res) => {
  res.json(res.order);
});

// CREATE a new order (protected route)
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Only registered users can make an order
  try {
    const order = new Order(req.body);
    order.user = req.user.id; // Set the user ID from the authenticated user
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an order (protected route)
router.patch('/:id', passport.authenticate('jwt', { session: false }), getOrder, async (req, res) => {
  try {
    const updatedOrder = await res.order.set(req.body).save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an order (protected route)
router.delete('/:id', passport.authenticate('jwt', { session: false }), getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.order = order;
  next();
}

export default router;*/
// order.routes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/*/ Add a new order
router.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error adding order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

// Add a new order
router.post('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Create a new Order instance
    const newOrder = new Order(req.body);
    
    // Set user ID from the authenticated user
    newOrder.user = req.user.id;
    
    // Save the new order to MongoDB Atlas
    const savedOrder = await newOrder.save();
    
    // Send the saved order as the response
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error adding order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update an order
router.patch('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an order
router.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

