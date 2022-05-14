const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
        res.cookie('isAuthenticated', false);
        res.cookie('login', '');
        res.sendFile(path.join(__dirname, '..', 'views', 'connection.html'));
});

exports.connectionRoutes = router;