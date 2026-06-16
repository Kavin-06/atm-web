require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodeCrypto = require('crypto');

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = nodeCrypto.webcrypto || nodeCrypto;
}
if (typeof global.crypto === 'undefined') {
  global.crypto = globalThis.crypto;
}

const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
  });
});

app.use('/api/atm', require('./routes/atmRoutes'));

app.get('/', (req, res) => {
  res.send('ATM API Server is running');
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
