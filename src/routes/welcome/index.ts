import express from 'express';

import { getWelcomePage } from '../../controllers/welcome';

const router = express.Router();

router.get('/', getWelcomePage);

export default router;