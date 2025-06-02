import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {Link , useNavigate} from 'react-router-dom'

const Signup = () => {
  const defaultImage = "https://images.unsplash.com/photo-1728046421058-1e1e28e57193?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [progressBar, setProgressBar] = useState(false);
  const [image, setImage] = useState(defaultImage);
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    channelName: '',
    userName: '', // Fixed the key name
    password: '',
    profilePicture: defaultImage, // Ensure the default matches
  });

  const handleInputChange = (e, name) => {
    setSignupForm({
      ...signupForm,
      [name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {
    console.log("Uploading...");
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'youtube-clone');

    try {
      setProgressBar(true)
      const response = await axios.post("https://api.cloudinary.com/v1_1/ddsiwsq5c/image/upload", data);
      setProgressBar(false);
      const imageUrl = response.data.url;
      setImage(imageUrl);

      setSignupForm((prevForm) => ({
        ...prevForm,
        profilePicture: imageUrl, // Correct key name
      }));
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const handleSignUp = async (e) => {
    // Show the progress bar
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      setProgressBar(true);
      const response = await axios.post('https://travel-tales-backend-gegu.onrender.com/auth/signUp', signupForm);
      console.log('Signup successful:', response.data);
      setProgressBar(false); // Hide the progress bar
      toast.success('Signup successful!');
      navigate('/')
    } catch (err) {
      console.error('Error during signup:', err);
      toast.error('Signup failed. Please try again.');
      setProgressBar(false); // Hide the progress bar
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up for YouTube</h2>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="channelName">Channel Name</label>
            <input 
              type="text" 
              id="channelName" 
              placeholder="Enter your Channel Name"
              value={signupForm.channelName}
              onChange={(e) => handleInputChange(e, "channelName")} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username"
              value={signupForm.userName} // Correct key name
              onChange={(e) => handleInputChange(e, "userName")} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={signupForm.password}
              onChange={(e) => handleInputChange(e, "password")} 
            />
          </div>
          <div className="dp">
            <input type="file" onChange={uploadImage} className="picture-input" accept="image/*" />
            <div className="imagediv">
              <img src={image} alt="Profile Preview" />
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signin-text">
          Already have an account? <a href="#" className="signin-link">Sign In</a>
        </p>
           {progressBar &&  <Box sx={{ width: '100%' }}>
           <LinearProgress />
          </Box>}
    
      </div>
      <ToastContainer />
    </div>
      
  );
};

export default Signup;
