const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();


router.get('/products', productController.product_get);
router.post('/products', productController.product_post);


module.exports = router;