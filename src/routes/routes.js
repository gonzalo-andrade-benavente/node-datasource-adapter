const express = require('express');
const router = express.Router();
const controller = require('../controller/datasourceController');

router.get('/vendors', controller.getDocument);

module.exports = router