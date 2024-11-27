import React, { useState ,useEffect } from 'react'

import './navbar.css'
import  Login from '../components/Login/Login'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import MicIcon from '@mui/icons-material/Mic';
import { Link , useNavigate} from 'react-router-dom';


const Navbar = ({setSideNavbarFunc, sideNavbar}) => {

    const [userPic, setUserPic] = useState("https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg")
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
     const[login ,setLogin] = useState(false);
     const[islogedIn ,setIsLogedIn] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        getLogoutFunc()
        setTimeout(()=>{
            navigate('/')
            window.location.reload();
        },2000)
        setShowUserMenu(false);
     
    };
    const getLogoutFunc= async ()=>{
        axios.post("http://localhost:3000/auth/logOut",{},{withCredentials :true}).then((res)=>{
            console.log("Logout Successfully")
        }).catch((err=>{
            console.log("Logout Error",err)
        }))
    }

 
    const handleLogin = () => {
        setShowUserMenu(false);
      
    };

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar)
    }

    const navigate = useNavigate();
    const handleProfile = () => {
        let userId = localStorage.getItem("userId")
        navigate(`/user/${userId}`)
        setShowUserMenu(false)
    }

 const onClickOfPopUpOption =(val)=>{
    if(val==='login'){
       setLogin(true);
    }else{

    }
   
 }
 const loginHide = ()=>{
    setLogin(false);
}

    useEffect(()=>{
        let userProfilePic = localStorage.getItem("profilePicture");
        setIsLogedIn(localStorage.getItem("userId")!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic);
        }
    },[])

  return (
    <div className='navbar'>
        <div className= 'menu-icon' onClick = {sideNavbarFunc}>
            <MenuIcon />
        </div>
        <div className="yt-logo">
          <Link to="/" className='logo'>
            <img src='https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png' alt='YouTube Logo' />
        </Link>
          </div>
       
        <div className='search-bar'>
            <input type='text' placeholder='Search' />
            <button className='search-icon'><SearchIcon /></button>
            <div className="mic-div">
            <button className='mic-icon'><MicIcon /></button>
            </div>
           
        </div>
    
        <div className='nav-icons'>
            <Link to= "/766/upload">
            <VideoCallIcon />
            </Link>
            <NotificationsIcon />
            <div className="user-menu">
                <div className="user-icon" onClick={() => setShowUserMenu(!showUserMenu)}>
                    <img src={userPic} alt="User" />
                </div>
                {showUserMenu && (
                    <div className="user-dropdown">
                        
                        {islogedIn && <button className='user-dropdown-btn' onClick= {handleProfile}>Profile</button>}
                        {islogedIn && <button className='user-dropdown-btn' onClick={() => { onClickOfPopUpOption("logout");handleLogout()}}>Logout</button>}
                        {!islogedIn &&<button className='user-dropdown-btn' onClick={() => { onClickOfPopUpOption("login"); handleLogin(); }}>Login</button>}
                       


                    </div>
                )}
            </div>
            
       
        </div>
      {
         login &&  <Login loginHide = {loginHide}/>
      }
    </div>
  )
}

export default Navbar
