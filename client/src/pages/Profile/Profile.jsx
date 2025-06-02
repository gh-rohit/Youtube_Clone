import React ,{useState , useEffect } from 'react'
import './profile.css'
import Sidenavbar from '../../components/SidenavBar/Sidenavbar'
import { Link ,useParams } from 'react-router-dom'
import axios from 'axios'


const Profile = ({sideNavbar}) => {
  const {id} = useParams()
  console.log(id)
  const [data , setData] = useState([])
  const [user , setUser] =  useState(null)
 const  fetchProfileData = async ()=>{
  axios.get(`https://youtube-clone-backend-une1.onrender.com/api/${id}/channel`).then((response)=>{
    console.log(response)
    setData(response.data.video)
    setUser(response.data.video[0]?.user)
  }).catch((error)=>{
    console.log(error)
  })
 }
  useEffect(()=>{
    fetchProfileData()
  },[])
  return (
    <div className='fullProfile'>
      <Sidenavbar sideNavbar={sideNavbar}/>
      <div className={sideNavbar ? "profile" : "margin-profile" }>
        <div className="profile-info">
          <img className="profile-avatar" src={user?.profilePicture} alt="User Avatar" />
          <div className="profile-details">
            <h1>{user?.channelName}</h1>
            <p>{data?.length} videos</p>
          </div>
        </div>
        {/*  when there  */}
        
        <div className="profile-content">
          <div className="video-grid">
            <h2>Uploaded Videos</h2>
            <div className="grid-container">
              {
                data.map((item , index)=>{
                  return (
                    <Link to={`/watch/${item._id}`} className="video-item">
                    <img src={item.thumbnail} alt="Video Thumbnail 1" />
                    <h3>{item.title}</h3>
                    <p>Created at {item.createdAt.slice(0,10)}</p>
                  </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
