const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173", // React frontend URL
   credentials: true,
   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"]
}));

// Routes
require('./Connection/connect');
const AuthRoutes = require('./Routes/user-route');
const videoRoutes = require('./Routes/video-route');
const commentRoutes = require('./Routes/comment-route');

app.use('/auth', AuthRoutes);
app.use('/api', videoRoutes);
app.use('/commentApi', commentRoutes);

// Dynamic Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`✅ Server is running on port ${PORT}`);
});
