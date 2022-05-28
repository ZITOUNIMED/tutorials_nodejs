import express from 'express';

import {createProduct, updateProduct, deleteProduct, getProducts} from '../../controllers/products';

const router = express.Router();

router.post('/', createProduct);

router.put('/', updateProduct);

router.delete('/:title', deleteProduct);

router.get('/', getProducts);

export default router;