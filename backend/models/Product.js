const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  brand: {
    type: String,
    required: [true, 'Please enter brand name'],
  },
  price: {
    type: String,
    required: [true, 'Please enter price'],
  },
  purchaseDate: {
    type: String,
    required: [true, 'Please enter purchase date'],
  }
});



const Product = mongoose.model('product', productSchema);

module.exports = Product;