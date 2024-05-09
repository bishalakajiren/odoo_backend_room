const socketIO = require('socket.io');

function socketLogic(server) {
    const io = socketIO(server, {
        cors: {
            origin: "*", // Allow all origins
            methods: ["GET", "POST"] // Allow only GET and POST requests
        }
    });
    console.log('Socket.IO setup complete', io);

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        // Handle socket events here

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io; // Return the io object
}

module.exports = socketLogic;
