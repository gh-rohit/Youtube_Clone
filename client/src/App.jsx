import {useState,useEffect} from 'react'
import {  Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import VideoUpload from './pages/videoUpload/videoUpload'
import Signup from './pages/Signup/Signup'
import axios from 'axios'
import './App.css'

import VideoPage from './pages/VideoPage/VideoPage'

const App = () => {
const [sideNavbar, setSideNavbar] = useState(true)
const setSideNavbarFunc = (value) => {
  setSideNavbar(value)
}
// useEffect(()=>{
//   axios.get('http://localhost:3000/api/allVideo').then(res=>{
//     console.log(res)
//   }).catch(err=>{
//     console.log(err)
//   })
// },[])
  return (
    <div className='App' >
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar}/>} />
        <Route path='/watch/:id' element={<VideoPage />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>} />
        <Route path='/:id/upload' element= {<VideoUpload/>} /> 
        <Route path='/signup'  element = {<Signup/>} />  
         </Routes>
  
    </div>
  )
}

export default App
