const express = require('express');
const productsController = require('../controllers/product');

const router = express.Router();

router.post('/', productsController.save);

router.delete('/:title',  productsController.delete);

router.get('/',  productsController.getProducts);

exports.productRoutes = router;