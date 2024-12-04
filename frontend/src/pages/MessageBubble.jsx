import React from 'react'
import { useSelector } from 'react-redux';

function MessageBubble({message}) {
  const loginUser= useSelector((state) => state.User.User);
  const chatuser = useSelector((state) => state.User.currentChatReciever);



  return (
    <>
      <div className={`chat ${loginUser.id === message.senderId ? "chat-end" : "chat-start"}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src= {loginUser.id === message.senderId ? loginUser.profilepicture: chatuser.profilePhoto}/>
    </div>
  </div>
  <div className="chat-header">
    {loginUser.id === message.senderId ? loginUser.name: chatuser.fullname}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble bg-orange-300 text-black">{message.message}</div>
</div> 

    </>
  )
}

export default MessageBubble
