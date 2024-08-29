const axios = require('axios');
const sharp = require('sharp');

const downloadAndResizeImage = async (url, outputPath) => {
  const response = await axios({ url, responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'binary');
  await sharp(imageBuffer).resize({ width: 500 }).toFile(outputPath);
};

module.exports = {
  downloadAndResizeImage,
};
