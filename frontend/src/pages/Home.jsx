import React, { useState, useEffect } from 'react';
import OtherUsers from './OtherUsers';
import MessageBubble from './MessageBubble';
import { FaSearch } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";
import Navbar from './Navbar';
import {useSelector} from "react-redux"


function Home() {
  const conversation = useSelector((state)=> state.User.Conversation)
  // State to store users and loading state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
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
        console.log("users",response)
        throw new Error('Failed to fetch users', Error);
      }

      const result = await response.json();
      console.log("selectend user conversation", conversation)
      console.log(result.users); // For debugging, you can remove this later
      setUsers(result.users); // Store the users in state
    } catch (error) {
      console.error(error);
      setError(error.message); // Set the error message for UI feedback
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

   

 const handleSendMessage = async(id)=>{
  const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      setError('No token found!');
      setLoading(false);
      return;
    }

    try{
      const response = await fetch(`http://localhost:8000/api/message/send/${id}`, {
        methods: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
    const result = await response.json();
    console.log(result)
  }
  catch(error){
    console.error(error)
  }



 }



  if (loading) {
    return <div>Loading...</div>; // Loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
     <>
    <div className='w-screen h-screen bg-[url("./bg.webp")] bg-cover bg-center flex m-0 gap-3 flex-col justify-center items-center'>
    <Navbar/>
        <div className='w-[95%] h-[84%] flex rounded-3xl border border-whiteshadow-2xl '>
        <div className='w-[27%] h-[100%] rounded-tl-3xl rounded-bl-3xl border border-white'>
           <div className='w-[100%] h-[14%] bg-blue-700 flex justify-center items-center rounded-tl-3xl relative '>
            <input className='w-[73%] h-11 rounded-3xl bg-white p-5 outline-none ' type="search" name="" id="" placeholder='Search user' />
            <FaSearch className="absolute left-72 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
           </div>
            <div className='flex flex-col w-[100%] h-[85%] overflow-y-auto rounded-bl-3xl'>
            {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
             <OtherUsers user={user }/>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
          
            </div>
           
      
        </div>


        <div className='h-[100%] w-[73%] rounded-3xl flex flex-col rounded-tl-3xl rounded-bl-3xl '>
          <div className='w-[100%] h-[10%] bg-blue-700 flex items-center justify-start p-10 gap-4 rounded-tr-3xl '>
            <div className='w-14 h-14 bg-red-700 rounded-full'>
            <img className='w-[100%] h-[100%] rounded-full' src="https://avatar.iran.liara.run/public/girl" alt="" />
            </div>
             <div className='flex flex-col justify-center'>
             <h1 className='text-2xl text-orange-500'>yo</h1>
             <p className='text-white'>online</p>
             </div>
          </div>
          <div className='p-11 overflow-y-auto h-[80%] w-[100%] '>
          <MessageBubble/>
          <MessageBubble/>
          <MessageBubble/>
          <MessageBubble/>
          <MessageBubble/>
          <MessageBubble/>
          
          </div>

          <div className='w-[100%] bg-blue-700 h-[15%] flex justify-center items-center gap-4 rounded-br-3xl'>
            <input className='bg-white rounded-3xl outline-none w-[75%] h-[60%] p-5' type="text" name="" id="" placeholder='Enter Your Message' />
            <IoSend onClick={()=>handleSendMessage()} className='text-3xl text-orange-400'/>
          </div>
        
        </div>
      
      </div>
  
    </div>
    
    </> 
  );
}

export default Home;
