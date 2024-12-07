import express from "express"
import http from "http"
import { Server} from "socket.io";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: " http://localhost:5173",
        methods: ["GET", "POST"],
      },
})

  const onlineUser = {}
   io.on("connection", (socket) => {
    console.log(`new user connected ${socket.id}`)

     const userId = socket.handshake.query.userId
     console.log("userid connected" , userId)
    if(userId !== undefined){
      onlineUser[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(onlineUser));

    
    

    socket.on("disconnect", () => {
      console.log(`a user disconnect ${socket.id}`)
      console.log("userid disconnected" , userId)
  
  })

})



export {app, server, io}