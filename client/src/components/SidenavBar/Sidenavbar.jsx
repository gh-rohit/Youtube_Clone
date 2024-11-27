import React from 'react'
import './sidenavbar.css'
import { Home, FlashOn, PlayCircleOutline, History, VideoLibrary, WatchLater, ThumbUp } from '@mui/icons-material'


const Sidenavbar = ({sideNavbar}) => {
  return (
    <div className= {sideNavbar ? 'home-sidenavbar' : 'home-sidenavbar-close'}>
      <div>
        <div className="sidebar-sections">
          <div className="sidebar-section">
            <ul>
              <li>
                <a href="/">
                  <Home />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/shorts">
                  <FlashOn />
                  <span>Shorts</span>
                </a>
              </li>
              <li>
                <a href="/subscriptions">
                  <PlayCircleOutline />
                  <span>Subscriptions</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>Library</h3>
            <ul>
              <li>
                <a href="/history">
                  <History />
                  <span>History</span>
                </a>
              </li>
              <li>
                <a href="/your-videos">
                  <VideoLibrary />
                  <span>Your videos</span>
                </a>
              </li>
              <li>
                <a href="/watch-later">
                  <WatchLater />
                  <span>Watch later</span>
                </a>
              </li>
              <li>
                <a href="/liked-videos">
                  <ThumbUp />
                  <span>Liked videos</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>Subscriptions</h3>
            <ul>
              {/* This would typically be dynamically generated */}
              <li>
                <a href="/channel1">
                  <img src="https://ik.imagekit.io/sheryians/Sheryians_logo_EzwgcppnD" alt="Channel 1" />
                  <span>Sheryians Coding School</span>
                </a>
              </li>
              <li>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
                <a href="/channel2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKhCwg8q4AFAi78gPP1k49tOtjpPWMAULYQ&s" alt="Channel 2" />
                  <span>T-series</span>
                </a>
              </li>
              {/* More subscription items */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidenavbar
