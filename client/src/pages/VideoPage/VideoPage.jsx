import React, { useEffect, useState, useRef } from 'react';
import './videopage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [data, setData] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check login status (using a token in local storage as an example)
    const token = localStorage.getItem('token'); // or sessionStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch video by ID
  const fetchVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getVideoById/${id}`);
      setData(response.data.getVideo);
      setVideoUrl(response?.data?.getVideo?.videoLink);
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  // Fetch suggested videos
  const fetchSuggestedVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/suggestedVideos/${id}`);
      setSuggestedVideos(response.data.videos);
    } catch (err) {
      console.error("Error fetching suggested videos:", err);
    }
  };

  // Fetch comments by video ID
  const getCommentedVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/commentApi/comment/${id}`);
      setComments(response.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchVideoById();
    fetchSuggestedVideos();
    getCommentedVideoById();
  }, [id]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const handleCommentFunc = async () => {
    if (!isLoggedIn) {
      alert("Please log in to post a comment.");
      // Redirect to login page
      return;
    }
    if (!commentInput.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      const body = {
        message: commentInput,
        video: id,
      };
      await axios.post(
        "http://localhost:3000/commentApi/comment",
        body,
        { withCredentials: true }
      );
      setCommentInput("");
      getCommentedVideoById(); // Refresh comments after posting
    } catch (err) {
      console.error("Error posting comment:", err.response?.data || err.message);
    }
  };

  return (
    <div className="videoPage">
      <div className="main-container">
        <div className="video-container">
          {videoUrl ? (
            <video ref={videoRef} src={videoUrl} controls autoPlay loop className="video-player" />
          ) : (
            <p>Loading video...</p>
          )}
          <div className="video-info">
            <h1 className="video-title">{data?.title || 'Video Title'}</h1>
            <span className="upload-date">{data?.createdAt?.slice(0, 10)}</span>
            <p className="video-description">{data?.description}</p>

            <Link to={`/user/${data?.user?._id}`} className="channel-info">
              <img src={data?.user?.profilePicture} alt="Channel Avatar" className="channel-avatar" />
              <div className="channel-details">
                <h3 className="channel-name">{data?.user?.channelName}</h3>
                <p className="subscriber-count">1M subscribers</p>
              </div>
            </Link>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h3 className="comment-count">{comments.length} Comments</h3>
            <div className="comment-form">
              <input
                type="text"
                className="comment-textarea"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button onClick={handleCommentFunc} className="comment-submit">
                Comment
              </button>
            </div>
            <div className="comments-list">
              {comments.map((item, index) => (
                <div className="comment" key={item._id || index}>
                  <img
                    src={item?.user?.profilePicture}
                    alt="User Avatar"
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <h4 className="comment-author">{item.user?.channelName || 'Anonymous'}</h4>
                    <h4 className="comment-date">{new Date(item.createdAt).toLocaleDateString()}</h4>
                    <p className="comment-text">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
