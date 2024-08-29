const express = require('express');
const mongoose = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const statusRoutes = require('./routes/statusRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const processImages = require('./controllers/imageProcessor');

const app = express();
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);
app.use('/api', statusRoutes);
app.use('/api', webhookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// To initiate image processing asynchronously
processImages();
