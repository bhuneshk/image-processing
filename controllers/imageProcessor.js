const axios = require('axios');
const sharp = require('sharp');
const Request = require('../models/Request');
const fs = require('fs');
const path = require('path');

const processImages = async () => {
  const requests = await Request.find({ status: 'pending' });

  requests.forEach(async (request) => {
    request.status = 'processing';
    await request.save();

    for (const product of request.products) {
      const outputUrls = [];

      for (const url of product.inputImageUrls) {
        const response = await axios({ url, responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        const outputPath = path.join(__dirname, `../output/${Date.now()}-${product.productName}.jpg`);
        await sharp(imageBuffer)
          .resize({ width: Math.round(response.data.width * 0.5) })
          .toFile(outputPath);

        outputUrls.push(outputPath);
      }

      product.outputImageUrls = outputUrls;
    }

    request.status = 'completed';
    await request.save();
  });
};

module.exports = processImages;
