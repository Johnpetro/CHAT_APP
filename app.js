// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (for frontend)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Broadcast messages to all connected clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
