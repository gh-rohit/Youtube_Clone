const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
    },
    message:{
        type: String,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{timestamps: true})

module.exports = mongoose.model('comment', commentSchema);