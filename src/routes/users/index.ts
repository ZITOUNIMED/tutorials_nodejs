import express from 'express';

import { saveUser, getUsersPage, getUserProfilePage, deleteUser } from '../../controllers/users';
import { isAdminConnected } from '../../util/auth'; 

const router = express.Router();

router.get('/profile', getUserProfilePage);

router.post('/', isAdminConnected, saveUser);

router.delete('/:login', isAdminConnected, deleteUser);

router.get('/', isAdminConnected, getUsersPage);

export default router;