const User = require('../Models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const cookieOptions ={
   httpOnly: true,
   secure: false,
   sameSite: 'Lax'
}

 exports.signUp = async (req,res)=>{
   try{
    const {channelName , userName ,password, profilePicture} = req.body
     const isExist =  await User.findOne({userName})
     if(isExist){
        res.status(400).json({error:"Username already exists please try other username"})
     }else{
        let hashedPassword = await bcrypt.hash(password,10);
        const user = new User({channelName, userName, password: hashedPassword, profilePicture})
        await user.save()
        res.status(201).json({message: "User saved successfully",success: true, data:user})   
     }

   }catch(error){
   res.status(500).json({error: error.message})
 } 
}

exports.signIn = async (req,res)=>{
 try{
   const {userName , password} = req.body
   const user = await User.findOne({userName})
   if(user && await bcrypt.compare(password,user.password)){
       const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
       res.cookie('token', token,cookieOptions)
       res.json({message: "User authenticated successfully", success: true,token,user})
      
   }else{
      res.status(400).json({error: "Inavlid Credentials"})
   }

 }catch(error){
   res.status(500).json({error: error.message})
 }
}

exports.logOut = async (req, res)=>{
   res.clearCookie('token', cookieOptions).json({message: "User logged out successfully"})

}