const comment = require('../Models/comment-model')

exports.addComment = async (req,res)=>{
    try{
        let {video , message} = req.body
        const Comment = new comment({user:req.user._id , video, message})
        await Comment.save();
        res.status(200).json({
            message: "Comment added successfully",
            success: true,
            data: Comment
        })

    }catch(err){
        res.status(500).json({error:err.message})
    }
}


exports.getCommentsByVideoId = async (req,res)=>{
    try{
        let {videoId} =req.params;
        const comments = await comment.find({video:videoId}).populate('user','userName channelName profilePicture createdAt')
        res.status(200).json({
            feed: "Comments shows successfully",
            success: true,
            comments
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }

}