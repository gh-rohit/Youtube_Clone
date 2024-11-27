import React from 'react'
import Sidenavbar from '../../components/SidenavBar/Sidenavbar'
import HomePage from '../../components/HomePage/HomePage'
import './home.css'

const Home = ({sideNavbar}) => {
  return (
    <div className='home'>
        <Sidenavbar sideNavbar={sideNavbar}/>   
        <HomePage sideNavbar={sideNavbar}/>
      
    </div>
  )
}

export default Home
