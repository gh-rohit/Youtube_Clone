const express = require('express');
const app = express();
const cookieParser =require('cookie-parser');
app.use(express.json())
app.use(cookieParser());
const cors = require('cors');
app.use(cors({
   origin:"http://localhost:5173", // react url
   credentials: true,
   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"]
}))


require('./Connection/connect')
const AuthRoutes = require('./Routes/user-route')
const videoRoutes = require('./Routes/video-route')
const commentRoutes = require('./Routes/comment-route')

app.use('/auth',AuthRoutes)
app.use('/api',videoRoutes)
app.use('/commentApi',commentRoutes)
 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
 })