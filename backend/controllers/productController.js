const Product = require("../models/Product");

// handle errors
const handleErrors = (err) => {
  let errors = {};

  // validation errors
  if (err.message.includes("product validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

product_get = async (req, res) => {
  Product.find({}, function (err, users) {
    var userMap = {
      data: [],
      count: 0,
    };

    users.forEach(function (user) {
      userMap.data.push(user);
      userMap.count += 1;
    });

    res.status(200).send(userMap);
  });
};

product_post = async (req, res) => {
  const data = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    purchaseDate: req.body.purchaseDate,
  };

  try {
    const product = await Product.create(data);

    res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  product_get,
  product_post,
};
