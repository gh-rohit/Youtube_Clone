import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Login = ({ loginHide }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [progressBar, setProgressBar] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!loginField.userName || !loginField.password) {
      console.log("Please fill in all fields.");
      return;
    }

    try {
      setProgressBar(true); // Show the progress bar
      const response = await axios.post(
        "https://youtube-clone-backend-une1.onrender.com/auth/logIn",
        loginField,{withCredentials: true}
      );
      setProgressBar(false)
      console.log(response.data);
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userId", response.data.user._id)
      localStorage.setItem("profilePicture",response.data.user.profilePicture)
     window.location.reload();
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.')
      console.log(error.response ? error.response.data : error.message);
      setProgressBar(false) // Hide the progress bar
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">YouTube Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            required
            value={loginField.userName}
            onChange={(e) => handleOnChangeInput(e, "userName")}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            required
            value={loginField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="options">
            <Link to="/signup">
              <button onClick={() => loginHide()} className="signup-button">
                Signup
              </button>
            </Link>
            <button className="cancel-button" onClick={() => loginHide()}>
              Cancel
            </button>
          </div>
        </form>
        { progressBar && <Box sx={{ width: '100%', marginTop:"20px" }}>
           <LinearProgress />
          </Box>}
      </div>
     
      <ToastContainer />
    </div>
  );
};

export default Login;
