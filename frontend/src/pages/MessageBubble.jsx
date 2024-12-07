import React from 'react'
import { useSelector } from 'react-redux';;

function MessageBubble({messages}) {
  const loginUser= useSelector((state) => state.User.User)
  const chatUser = useSelector((state) => state.User.currentChatReciever);
  
   


  return (
    <>
      <div className={`chat ${loginUser.id === messages.senderId ? "chat-end" : "chat-start"}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src= {loginUser.id === messages.senderId ? loginUser.profilepicture: chatUser.profilePhoto}/>
    </div>
  </div>
  <div className="chat-header">
    {loginUser.id === messages.senderId ? loginUser.name: chatUser.fullname}
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble bg-orange-300 text-black">{messages.message}</div>
</div> 

    </>
  )
}

export default MessageBubble
