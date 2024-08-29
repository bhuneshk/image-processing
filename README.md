This project processes image data from CSV files, compresses images asynchronously, and stores results in MongoDB. It includes APIs to upload CSVs, check processing status, and trigger webhooks.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Image Processing: Sharp
File Upload: Multer

API Endpoints
Upload CSV: /api/upload (POST)

Upload a CSV file with product details and image URLs.
Returns a unique requestId.
Check Status: /api/status/:requestId (GET)

Check processing status of the request (pending, processing, completed).
Webhook: /api/webhook (POST)

Register a webhook to receive a notification when processing completes.
