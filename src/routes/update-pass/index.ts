import express from 'express';

import { updatePass, getUpdatePassPage } from '../../controllers/update-pass';

const router = express.Router();

router.post('/update', updatePass);

router.get('/:login', getUpdatePassPage);


export default router;