import { Socket } from "socket.io-client";

import io from "socket.io"

const socket = io("http://localhost:8000", {
    query: {
        userid: "user123"
    }
})

socket.on("connect", () => {
    console.log("Connected to server")
})