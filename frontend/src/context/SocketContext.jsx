import React, { useState } from 'react'
import { createContext , useContext } from "react"
import AuthContext from "./context.AuthProvider"

import { useEffect } from 'react';
import io from "socket.io-client";
  

export const socketContext = createContext()


export const socketProvider = ({ children })=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    
    const user = useContext(AuthContext)
     
    useEffect(() => {
        if (user){
            const socket = io ("http://localhost:8000", {

                query:{
                    userid: user.id
                }

            })  
        }
        setSocket(socket)
        socket.on("getOnlineUsers", (users) =>{
            setOnlineUsers(users);   
        }),
        retrurn () => socket.close()
         
       }, [])

    return (
    <socketContext.Provider >
      {children}
    </socketContext.Provider>
  )

}
