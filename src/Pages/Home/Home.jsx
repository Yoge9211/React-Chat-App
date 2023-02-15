import React from 'react'
import Chat from '../../components/Chat'
import Sidebar from '../../components/Sidebar'
import './home.scss'

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="chat-box">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
