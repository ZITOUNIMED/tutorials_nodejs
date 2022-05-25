import express from 'express';

import { signIn } from '../../controllers/login';

const router = express.Router();


router.post('/', signIn);

export default router;