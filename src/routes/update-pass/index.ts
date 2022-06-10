import express from 'express';

import {getUpdatePassPage, updatePass} from '../../controllers/update-pass';

const router = express.Router();

router.get('/:login', getUpdatePassPage);

router.post('/update', updatePass);

export default router;