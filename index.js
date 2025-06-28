const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);  // Correct usage
const port = 5000;

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket logic
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('send name', (username) => {
        io.emit('send name', username);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});

// Start server
server.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
