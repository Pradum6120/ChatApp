import express from "express"
import http from "http"
import socket from "socket.io"
const app = express()

const server = http.createServer(app)
const io = new server(socket, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
      },
})


io.on("connection", (socket)=>{
    console.log(`new user connected ${socket.id}`)
})