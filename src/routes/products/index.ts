import express from 'express';

import {saveProduct, deleteProduct, getProducts} from '../../controllers/products';

const router = express.Router();

router.post('/', saveProduct);

router.delete('/:title', deleteProduct);

router.get('/', getProducts);

export default router;