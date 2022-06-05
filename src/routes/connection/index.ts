import express from 'express';

import { signIn, signUp } from '../../controllers/connection';

const router = express.Router();

router.post('/login', signIn);

router.post('/sign-up', signUp);

export default router;