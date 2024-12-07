import React from 'react'
import { useDispatch } from 'react-redux';
import { setMessageReciever } from "../store/UserSlice"
import { getMessage } from '../store/UserSlice';
import { useSelector } from 'react-redux';


function OtherUsers({user}) {
  const dispatch = useDispatch();

   const handleChat = (user) => {
    const userid = user._id
     dispatch(setMessageReciever(user));
     dispatch(getMessage(userid))
  }

  return (
    <div onClick={()=>handleChat(user)} className='w-[100%] h-16 flex items-center justify-start p-10 gap-4 shadow-inner'>
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
