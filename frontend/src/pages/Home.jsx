import React, { useState, useEffect } from 'react';
import Lhome from './Lhome';
import RHome from './RHome';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { setauthUser } from '../store/UserSlice';


function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    dispatch(setauthUser(loginUser))
  
  }, [])
  

  return (
    <div className="w-screen h-screen bg-[url('./bg.webp')] bg-cover bg-center flex m-0 gap-3 flex-col justify-center items-center">
      <Navbar />
      <div className="w-[95%] h-[84%] flex rounded-3xl border border-whiteshadow-2xl">
         <Lhome/>
        <RHome/>
      </div>
    </div>
  );
}

export default Home;
