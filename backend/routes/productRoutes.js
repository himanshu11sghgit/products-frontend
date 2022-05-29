const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();


router.get('/products', productController.product_get);
router.post('/products', productController.product_post);
// router.put('/product/:productId', productController.product_put);
// router.delete('/product/:productId', productController.product_delete);

module.exports = router;