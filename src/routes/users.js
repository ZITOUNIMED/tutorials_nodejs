const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/profile', usersController.getUserProfilePage);

router.post('/', usersController.save);

router.delete('/',  usersController.delete);

router.get('/', usersController.getUsersPage);

exports.usersRoutes = router;