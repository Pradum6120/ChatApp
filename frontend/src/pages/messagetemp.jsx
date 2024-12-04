import React from 'react'
import { useSelector } from 'react-redux';

function MessageBubble({message}) {
  const loginUser= useSelector((state) => state.User.User);


  return (
    <>
      
        {loginUser.id === message.senderId ? <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    loginuser
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble bg-orange-300 text-black">{message.message}</div>
</div> : <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="loginUser.profilepicture" />
    </div>
  </div>
  <div className="chat-header">
    recieverUser
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble bg-yellow-400 text-black"> reciever message</div>
</div> }
        

    </>
  )
}

export default MessageBubble
