import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, handleSendMessage as sendMessageAction } from '../store/UserSlice';  // Rename import to avoid conflict

function RHome() {
  const messages = useSelector((state) => state.User.Conversation);
  const chatUser = useSelector((state) => state.User.currentChatReciever);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  // Local handleSendMessage function to dispatch the Redux action
  const handleSend = () => {
    if (message.trim() !== '') {
      // Dispatching actions to send a message and fetch the updated conversation
      dispatch(sendMessageAction({ id: chatUser._id, message }));
      dispatch(getMessage({ id: chatUser._id }));
      setMessage('');  // Clear the input field after sending the message
    }
  };

  return (
    <div className="h-full w-[73%] rounded-3xl flex flex-col rounded-tl-3xl rounded-bl-3xl">
      <div className="w-full h-1/10 bg-blue-700 flex items-center justify-start p-10 gap-4 rounded-tr-3xl">
        <div className="w-14 h-14 bg-red-700 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src={chatUser?.profilePhoto}
            alt="Profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl text-orange-500">{chatUser?.fullname}</h1>
          <p className="text-white">online</p>
        </div>
      </div>

      <div className="p-11 overflow-y-auto h-4/5 w-full">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble  messages={msg} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <h1>No messages available</h1>
          </div>
        )}
      </div>

      <div className="w-full bg-blue-700 h-1/6 flex justify-center items-center gap-4 rounded-br-3xl">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white rounded-3xl outline-none w-3/4 h-3/5 p-5"
          type="text"
          placeholder="Enter Your Message"
        />
        <IoSend onClick={handleSend} className="text-3xl text-orange-400 cursor-pointer" />
      </div>
    </div>
  );
}

export default RHome;
