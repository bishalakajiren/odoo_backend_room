const express = require('express');
const router = express.Router();
const roomController = require('../Controllers/roomController');
const authMiddleware = require('../Middleware/authMiddleware');
const RoomValidation = require('../Middleware/RoomValidation');

// Get all rooms
router.get('/getrooms', roomController.getAllRooms);

router.get('/protected', authMiddleware.verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
  });

// Get room by ID
router.get('/rooms/:id', roomController.getRoomsById);

// Add new room
router.post('/addrooms',  authMiddleware.verifyToken,RoomValidation.createRoomValidation ,roomController.createRooms);

// Update room
router.put('/updaterooms/:id',  authMiddleware.verifyToken,roomController.updateRooms);

// // Delete room
router.delete('/deleterooms/:id',  authMiddleware.verifyToken,roomController.deleteRooms);

// // Get all rooms
router.post('/getrooms', authMiddleware.verifyToken,roomController.getAllRooms);




module.exports = router;