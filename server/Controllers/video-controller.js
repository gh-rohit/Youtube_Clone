const video = require('../Models/video-model');

exports.uploadVideo = async (req,res)=>{
try{
  const {title , description, videoLink ,videoType,thumbnail} = req.body;
    const videoUpload = new video({user:req.user._id, title, description, videoLink, videoType ,thumbnail});
    await videoUpload.save();
    res.status(201).json({message: "Video uploaded successfully", success: true, data: videoUpload})

}catch(error){
    res.status(500).json({error:error.message})
}
}

exports.getAllVideo = async (req, res)=>{
  try{
const  videos = await video.find().populate('user','userName channelName profilePicture createdAt')
    res.status(200).json({message: "All videos fetched successfully", success: true,  videos})

  }catch(error){
    res.status(500).json({error:error.message})

  }

}

exports.getVideoById = async (req, res)=>{
   try{
    let {id} = req.params
   const getVideo = await video.findById(id).populate('user','userName channelName profilePicture createdAt')
   res.status(200).json({message: "got video sucessfully", success: true, getVideo})

   }catch(error){
    res.status(500).json({error:error.message})
   }

}


exports.getAllVideoByUserId = async (req, res)=>{
  try{
    let {userId} = req.params 
    const allvideo = await video.find({user:userId}).populate('user','userName channelName profilePicture')
    res.status(200).json({message: "got all video sucessfully", success: true,  video:allvideo})
    
  }catch(error){
    res.status(500).json({error:error.message})
  }
}