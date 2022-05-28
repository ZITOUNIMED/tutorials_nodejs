import express from 'express';

import { getWelcome, getWelcomeData } from '../../controllers/welcome';

const router = express.Router();

router.get('/', getWelcome);

router.get('/welcome/data', getWelcomeData);

export default router;