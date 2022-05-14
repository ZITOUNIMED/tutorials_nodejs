const express = require('express');
const path = require('path');

const welcomeController = require('../controllers/welcome');

const router = express.Router();

router.get('/', welcomeController.getWelcomePage);

exports.welcomeRoutes = router;