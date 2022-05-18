const express = require('express');

const usersController = require('../controllers/users');
const { isAdminConnected } = require('../util/auth'); 

const router = express.Router();

router.get('/profile', usersController.getUserProfilePage);

router.post('/', isAdminConnected, usersController.save);

router.delete('/:login', isAdminConnected, usersController.delete);

router.get('/', isAdminConnected, usersController.getUsersPage);

exports.usersRoutes = router;