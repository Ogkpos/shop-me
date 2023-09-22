const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Order must belong to a Product!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Order must have a price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

// Populate user and product data
orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'product',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
