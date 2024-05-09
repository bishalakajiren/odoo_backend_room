const express = require('express');
const http = require('http');
const socketLogic = require('./src/socketconnection/socket'); // Socket.IO logic
const cors = require('cors'); // Import cors module
const bodyParser = require('body-parser');
const roomRoutes = require('./src/Routes/roomRoutes');
const sessionRoutes = require('./src/Routes/sessionRoutes');
const bookingRoutes = require('./src/Routes/bookingRoutes');
const tagsRoutes = require('./src/Routes/tagsRoutes');
const pool = require('./db');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Routes
app.use('/apiroom', roomRoutes);
app.use('/apisession', sessionRoutes);
app.use('/apibooking', bookingRoutes);
app.use('/apitags', tagsRoutes);

// Socket.IO setup
socketLogic(server);
console.log('Socket.IO setup complete');

// Test database connection
async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        console.log('Connection to the database has been established successfully.');
        connection.release();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDatabaseConnection();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});