const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('welcome' , { 
        pageTitle: 'Welcome Page',
        isProductsPage: false,
        isWelcomePage: true
    });
});


exports.welcomeRoutes = router;