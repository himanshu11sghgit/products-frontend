const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter customer name'],
  },
  brand: {
    type: String,
    required: [true, 'Please enter customer address'],
  },
  price: {
    type: String,
    required: [true, 'Please enter product total'],
  },
  purchaseDate: {
    type: String,
    required: [true, 'Please enter purchase date'],
  }
});



const product = mongoose.model('product', productSchema);

module.exports = product;