require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodeCrypto = require('crypto');

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = nodeCrypto.webcrypto || nodeCrypto;
}
if (typeof global.crypto === 'undefined') {
  global.crypto = globalThis.crypto;
}

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;

if (!uri) {
  console.error('Error: MONGO_URI is not set in .env');
  process.exit(1);
}

mongoose.set('strictQuery', false);

mongoose
  .connect(uri, {
    dbName,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:');
    console.error('ERROR OBJECT:', err);
    console.error('ERROR NAME:', err.name);
    console.error('ERROR MESSAGE:', err.message);
    console.error('ERROR STACK:');
    console.error(err.stack);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Backend is running');
});
