const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [{ 
    product: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    }
  }]
});

// Define a static method to insert a new cart document
cartSchema.statics.createNewCart = async function(userId, products) {
  try {
    // Create a new cart instance
    const newCart = new this({
      user: userId,
      products: products
    });

    // Save the cart document to the database
    const savedCart = await newCart.save();
    return savedCart;
  } catch (error) {
    throw new Error('Error creating new cart: ' + error.message);
  }
};

const Cart = model('Cart', cartSchema);

module.exports = Cart;
