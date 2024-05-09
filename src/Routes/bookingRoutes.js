const express = require('express');
const router = express.Router();
const bookingController = require('..//Controllers/bookingController');
const { bookRoomValidation } = require('../Middleware/bookingValidation');
const authMiddleware = require('../Middleware/authMiddleware');
// Book a room
router.post('/createbook', authMiddleware.verifyToken, bookingController.bookRoom);

// Get booking by ID
router.post('/getidbook/:id', bookingController.getbookRoomsById);

// Get all bookings
router.post('/getallbook', authMiddleware.verifyToken,bookingController.getAllbookRooms);

// Delete booking
router.delete('/deletebook/:id', authMiddleware.verifyToken,bookingController.deletebookRooms);

// Update booking
router.put('/updatebook/:id', authMiddleware.verifyToken,bookingController.updatebookRooms);



module.exports = router;