const express = require('express');
const axios = require('axios');
const Request = require('../models/Request');

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const { requestId, webhookUrl } = req.body;

  const request = await Request.findOne({ requestId });
  if (request.status === 'completed') {
    await axios.post(webhookUrl, { requestId, status: 'completed' });
  }

  res.status(200).json({ message: 'Webhook triggered successfully' });
});

module.exports = router;
