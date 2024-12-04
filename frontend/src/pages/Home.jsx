import React, { useState, useEffect } from 'react';
import OtherUsers from './OtherUsers';
import MessageBubble from './MessageBubble';
import { FaSearch } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

function Home() {
  const conversation = useSelector((state) => state.User.Conversation);
  const chatuser = useSelector((state) => state.User.currentChatReciever);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () =>{
     console.log(message)
  }

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/allusers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found!');
      setLoading(false);
      return;
    }

  try {
      const response = await fetch(`http://localhost:8000/api/message/send/${chatuser._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      console.log(result);

    }
     catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen bg-[url('./bg.webp')] bg-cover bg-center flex m-0 gap-3 flex-col justify-center items-center">
      <Navbar />
      <div className="w-[95%] h-[84%] flex rounded-3xl border border-whiteshadow-2xl ">
        <div className="w-[27%] h-[100%] rounded-tl-3xl rounded-bl-3xl border border-white">
          <div className="w-[100%] h-[14%] bg-blue-700 flex justify-center items-center rounded-tl-3xl relative ">
            <input
              className="w-[73%] h-11 rounded-3xl bg-white p-5 outline-none"
              type="search"
              placeholder="Search user"
            />
            <FaSearch className="absolute left-72 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col w-[100%] h-[85%] overflow-y-auto rounded-bl-3xl">
            {users.length > 0 ? (
              <ul>
                {users.map((userItem) => (
                  <OtherUsers key={userItem.id} user={userItem} />
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>

        {chatuser && Object.keys(chatuser).length > 0 ? (
          <div className="h-[100%] w-[73%] rounded-3xl flex flex-col rounded-tl-3xl rounded-bl-3xl ">
            <div className="w-[100%] h-[10%] bg-blue-700 flex items-center justify-start p-10 gap-4 rounded-tr-3xl ">
              <div className="w-14 h-14 bg-red-700 rounded-full">
                <img
                  className="w-[100%] h-[100%] rounded-full"
                  src={chatuser.profilePhoto}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl text-orange-500">{chatuser.fullname}</h1>
                <p className="text-white">online</p>
              </div>
            </div>
            <div className="p-11 overflow-y-auto h-[80%] w-[100%]">
              {conversation && conversation.length > 0 ? (
                conversation.map((message) => (
                  <MessageBubble key={message.id} message={message.message} />
                ))
              ) : (
                <div className="flex justify-center items-center w-[100%] h-[100%]">
                  <h1>No messages available</h1>
                </div>
              )}
            </div>
            <div className="w-[100%] bg-blue-700 h-[15%] flex justify-center items-center gap-4 rounded-br-3xl">
              <input
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
                className="bg-white rounded-3xl outline-none w-[75%] h-[60%] p-5"
                type="text"
                placeholder="Enter Your Message"
              />
              <IoSend onClick={()=> handleSendMessage()} className="text-3xl text-orange-400" />
            </div>
          </div>
        ) : (
          <div>No user selected.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
