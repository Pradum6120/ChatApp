import React from 'react'
import { useDispatch } from 'react-redux';
import { setConversation}  from "../store/UserSlice"


function OtherUsers({user}) {
  const dispatch = useDispatch()
  const handle = async (id) => {
    // code to open chat window with selected user
    console.log("userid" , id)
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      console.log('No token found!');
    
      return;
    }
    try{
      const response = await fetch(`http://localhost:8000/api/message/get/${id}`, {
         method: "GET",

         headers: {
          'Authorization': `Bearer ${token}`,
        },

         
       });
       const result = await response.json()
       dispatch(setConversation(result))
       console.log(result)
    

    }
    catch(err){
      console.log(err)
     
    }
  }
  return (
    <div onClick={()=>handle(user._id)}className='w-[100%] h-16 flex items-center justify-start p-10 gap-4 shadow-inner'>
    <div className='w-14 h-14 bg-red-700 rounded-full'>
    <img className='w-14 h-14 rounded-full' src={user.profilePhoto} alt="" />
    </div>
     <div className='flex flex-col justify-center'>
     <h1 className='text-xl text-orange-500'>{user.fullname}</h1>
     <p>{user.username}</p>
     </div>
  </div>
  )
}

export default OtherUsers
