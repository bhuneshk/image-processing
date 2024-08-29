const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const Request = require('../models/Request');

const uploadFile = (req, res) => {
  const requestId = uuidv4();
  const products = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      products.push({
        serialNumber: row['Serial Number'],
        productName: row['Product Name'],
        inputImageUrls: row['Input Image Urls'].split(',')
      });
    })
    .on('end', async () => {
      const newRequest = new Request({ requestId, products });
      await newRequest.save();
      res.status(200).json({ requestId });
    });
};

const checkStatus = async (req, res) => {
  const request = await Request.findOne({ requestId: req.params.requestId });
  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }
  res.status(200).json({ status: request.status });
};

module.exports = {
  uploadFile,
  checkStatus,
};
