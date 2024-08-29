const express = require('express');
const { checkStatus } = require('../controllers/requestController');

const router = express.Router();

router.get('/status/:requestId', checkStatus);

module.exports = router;
