const product = require("../models/product");


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {  };


  // validation errors
  if (err.message.includes('product validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


product_get = async (req, res) => {
  product.find({}, function(err, users) {
    var userMap = {
      data: [],
      count: 0
    };

    users.forEach(function(user) {
      userMap.data.push(user);
      userMap.count += 1;
    });

    res.status(200).send(userMap);  
  });
 
}

product_post = async (req, res) => {
  const data = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    productTotal: req.body.productTotal,
    dueDate: req.body.dueDate,
    customerPhone: req.body.customerPhone
  }

  try {
    const product = await product.create(data);
    
    res.status(201).json({ 
      status: true,
      message: "product created succesfully"
     });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

product_delete = (req, res) => {
  product.findOneAndRemove({_id: req.params.productId}, (err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed in deleting product"
      });
    }

    res.status(200).json({
      status: true,
      message: "product deleted successfully"
    })
  });
}

product_put = (req, res) => {

  const data = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    productTotal: req.body.productTotal,
    dueDate: req.body.dueDate,
    customerPhone: req.body.customerPhone
  }

  product.findOneAndUpdate(
    { _id: req.params.productId},
    data,
    (err, item) => {
      if (err) {
        res.json({
          data,
          status: false,
          message: 'Failed to update product'
        })
      } else {
        res.json({
          data, 
          status: true, 
          message: 'product updated successfully'
        })
      }
    }
  )
}



module.exports = {
  product_get,
  product_post,
  product_delete,
  product_put
}


