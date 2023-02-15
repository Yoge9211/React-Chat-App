import React, { useContext } from 'react'
import { BsCamera } from 'react-icons/bs'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import Messages from './Messages'
import Input from './Input'
import '../styles/chat.scss'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext)
  console.log(data)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsCamera />
          <BsPersonPlusFill />
          <FiMoreHorizontal />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
