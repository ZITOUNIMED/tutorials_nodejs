import express from 'express';

import { createUser, updateUser, getUsersPage, getUserProfile, deleteUser, generatePass } from '../../controllers/users';
import { isAdminConnected } from '../../util/auth'; 

const router = express.Router();

router.get('/profile', getUserProfile);

router.post('/', isAdminConnected, createUser);

router.put('/', isAdminConnected, updateUser);

router.delete('/:login', isAdminConnected, deleteUser);

router.post('/generate-pass', isAdminConnected, generatePass);

router.get('/', isAdminConnected, getUsersPage);

export default router;