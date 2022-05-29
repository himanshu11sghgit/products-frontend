const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));


// database connection
const dbURI = 'mongodb+srv://balwant:VOSR4ZLR989JPV6Z@cluster0.xmx3h.mongodb.net/product-management?retryWrites=true&w=majority';
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true,
  useFindAndModify: false
})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes

app.use(authRoutes);
app.use(productRoutes);