const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/youtube-backend', {
})
.then(() => console.log('DB connection established'))
.catch((err) => console.error('Error connecting to DB:', err));
