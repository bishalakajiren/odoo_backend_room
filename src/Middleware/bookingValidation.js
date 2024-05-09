// middleware/bookingValidation.js

const { body } = require('express-validator');

exports.bookRoomValidation = [
    body('roomId').notEmpty().withMessage('Room ID is required'),
    body('sessionId').notEmpty().withMessage('Session ID is required'),

    body('bookedBy').notEmpty().withMessage('Booked by is required')
];
