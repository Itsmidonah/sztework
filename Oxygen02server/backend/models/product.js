const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

// Define a static method to insert a new product document
productSchema.statics.createProduct = async function(productData) {
  try {
    // Create a new product instance
    const newProduct = new this(productData);
    
    // Save the product document to the database
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    throw new Error('Error creating new product: ' + error.message);
  }
};

module.exports = mongoose.model('Product', productSchema);
