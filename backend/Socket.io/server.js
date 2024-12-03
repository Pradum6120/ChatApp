import express from "express"
import http from "http"
import socket from "socket.io"
const app = express()

const server = http.createServer(app)
const io = new server(socket, {
    cors: {
        origin: " http://localhost:5173",
        methods: ["GET", "POST"],
      },
})

  const user = {}
io.on("connection", (socket) => {
    console.log(`new user connected ${socket.id}`)
    // userid come from frontend
    const userId = socket.handshake.query.userId
    if(userId){
           
    }

})

socket.on("disconnect", () => {
    console.log(`a user disconnect ${socket.id}`)

})