const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {})
  .then(() => console.log('DB connection established'))
  .catch((err) => console.error('Error connecting to DB:', err));

