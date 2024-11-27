import React ,{useEffect ,useState} from 'react'
import './homepage.css'
import { Link } from 'react-router-dom'
import  axios from 'axios'

const HomePage = ({sideNavbar}) => {
  const options = ['All','Home', 'Trending', 'Subscription','Library','History','Your Videos','Watch Later','Liked Videos','Create a Video','Settings','Help','Feedback','Report a Bug']
  const[data , setdata] = useState([])
useEffect(()=>{
  axios.get('http://localhost:3000/api/allVideo').then(res=>{
    console.log(res.data)
    setdata(res.data.videos)
  }).catch(err=>{
    console.log(err)
  })
},[])
  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {
          options.map((option,index)=>(
            <div className="homePage_options_item" key={index}>
              <p>{option}</p>
            </div>
          ))
        }
      
      </div>
      <div className="homePage_videos">
        <div className="homePage_videos_container">
      
      {
        data?.map((item, index)=>{
          return(
            <Link to={`/watch/${item._id}`} className="homePage_videos_item">
            <img src={item.thumbnail} alt="video"/>
            <div className="homePage_videos_item_time">
              <p>12:30</p>
            </div>
            <div className="video_info">
          <div className="video_title">
            <img src={item?.user?.profilePicture} alt="video" />
            <h3>{item.title}</h3>
          </div>
          <div className="video_channel">
            <p>{item?.user?.channelName}</p>
          </div>
          <div className="video_views">
            <p>{item.like} likes</p>
          </div>
         </div>
          </Link>
          )
        })
      } 
        </div>
    
      </div>
    </div>
  )
}

export default HomePage
