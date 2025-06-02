import React, { useEffect, useState } from 'react';
import './videoUpload.css'; // Import the CSS file
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const videoUpload = () => {
  // const [thumbnail, setThumbnail] = useState(null);

  // Handler for setting the thumbnail preview
  // const handleThumbnailChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setThumbnail(URL.createObjectURL(file));
  //   }
  // };
  const navigate = useNavigate();
  const [loader , setLoader] = useState(false);
  const [inputField , setInputField] = useState({
    title: '',
    description: '',
    thumbnail: '',
    videoType: '',
  })
  const handleOnChangeInput = (event , name)=>{
    setInputField({
      ...inputField,
      [name]:event.target.value,
    })
  }

  const uploadImage = async (e, type) => {
    setLoader(true)
    console.log("Uploading");
    const file = e.target.files[0];

    const data = new FormData();
    data.append('file', file); 
    data.append('upload_preset', 'youtube-clone'); 
  
    try {
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/ddsiwsq5c/${type}/upload`, data);
      console.log(response.data); 
      const url = response.data.url;
      setLoader(false)
      let val = type === "image" ? "thumbnail" :"videoLink";
       setInputField({
      
        ...inputField,
        [val]:url,
      })
    
    } catch (err) {
      setLoader(false)
      console.log('Error uploading image:', err);
    }
   
  };
  console.log(inputField)
  useEffect(()=>{
    let isLogin =localStorage.getItem("userId")
    if(isLogin===null){
      navigate("/")
      return;
    }
  },[])

  const handleSubmitFunc = async () => {
    try {
      const res = await axios.post('https://youtube-clone-backend-une1.onrender.com/api/video', inputField, {
        withCredentials: true,
      });
      console.log(res.data);
      alert('Video uploaded successfully!');
      navigate('/')
    } catch (err) {
      console.error('Error uploading video:', err.response?.data || err.message);
      alert('Failed to upload video. Please try again.');
    }
  };
  
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Upload Your Video</h2>
        
        {/* Video Title Input */}
        <input
          type="text"
          placeholder="Video Title"
          className="input"
          value={inputField.title}
          onChange={(e)=>handleOnChangeInput(e ,"title")}
        />
        
        {/* Video Description Input */}
        <textarea
          placeholder="Video Description"
          className="textarea"
          value={inputField.description}
          onChange={(e)=>handleOnChangeInput(e ,"description")}
        ></textarea>
        
        {/* Thumbnail Upload */}
        <div className="thumbnail-container">
          <label className="upload-label" htmlFor="thumbnail">
            Select Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="file-input"
            onChange={(e)=>uploadImage(e,"image")} 
          />
        </div>
        { 
          loader &&  <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>

        }
       
        
        {/* Thumbnail Preview */}
        {/* {thumbnail && (
          <div className="preview">
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="thumbnail-preview"
            />
          </div>
        )}
         */}
        {/* Video Upload Input */}
        <div className="video-upload-container">
          <label className="upload-label" htmlFor="videoUpload">
            Select Video
          </label>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            className="file-input"
           
            onChange={(e)=>uploadImage(e,"video")}
          />
        </div>
        
        {/* Upload Button */}
        <button onClick={handleSubmitFunc} className="upload-button">Upload Video</button>
      </div>
    </div>
  );
};

export default videoUpload;
