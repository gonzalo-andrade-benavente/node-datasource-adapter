const express = require('express');
const router = express.Router();
const controller = require('../controller/datasourceController');

router.get('/subclass', controller.getDocument);

router.get('/subclass/:id', controller.getDocumentById);

router.post('/subclass', controller.postDocument);

module.exports = router