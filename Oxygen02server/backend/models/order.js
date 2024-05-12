// order.model.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentDetails: { type: String, required: true },
  orderStatus: { type: String, default: 'pending' }, // Possible values: 'pending', 'confirmed', 'shipped', 'delivered', etc.
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
