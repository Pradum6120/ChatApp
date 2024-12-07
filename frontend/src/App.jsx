// App.js or main component

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import io from "socket.io-client"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setSocket } from './store/socketSlice';
import { setonlineUsers } from './store/UserSlice';
import { setauthUser } from './store/UserSlice';



// Importing the components for different pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';  // Optional: Homepage to navigate after login/signup

function App() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.User.User);


  useEffect(() => {
    if(loginUser){
      const socket = io("http://localhost:8000", {
        query: {
            userId : loginUser.id
        }
    })
     dispatch(setSocket(socket))

     // getting online users from backend  and store in store 
       socket.on("getOnlineUsers", (users) => {
        dispatch(setonlineUsers(users));
      })
    }
     
  }, [loginUser])
  


  return (
   
      <Routes>
        {/* Define routes for the Login and Signup pages */}
        <Route path="/" element={<Home />} />   {/* Home page (optional) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
