const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description:{
        type: String,
     
    },
    thumbnail : {
        type: String,
        required: true
    },
    videoType : {
        type: String,
        default: 'All'
    },
    videoLink :{
        type: String,
        required: true
    },
    like:{
        type: Number,
        default: 0
    },
    dislike:{
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('video', videoSchema);