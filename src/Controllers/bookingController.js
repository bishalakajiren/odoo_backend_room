// controllers/bookingController.js

const RoomBooking = require('../Models/Booking-model');
const { validationResult } = require('express-validator');
const Room = require('../Models/Room-model');


// Book a room
exports.bookRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { roomId, sessionId,date,timeSlot, bookedBy } = req.body;

  try {
      const booking = await RoomBooking.createbookRoom({ roomId, sessionId, date, timeSlot, bookedBy });

      // Update room capacity
      const room = await Room.findRoomById(roomId);
      if (room) {
        // Decrease capacity by 1
        room.capacity -= 1;
        await Room.updateRoom(roomId, room);
      }

      return res.status(200).json({ message: 'Room booked successfully', data: booking });
  } catch (error) {
      console.error('Error in booking room:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatebookRooms = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  const bookroomId = req.params.id;
  const { roomId, sessionId, date, timeSlot, bookedBy } = req.body;
 
  try {
    const updatedrooms = await RoomBooking.updatebookRoom(bookroomId, {
      roomId,
      sessionId,
      date,
      timeSlot,
      bookedBy
    });

    // const findUpdatedrooms = await RoomBooking.findRoomById(bookroomId);
    return res.status(200).json({ message: 'Service updated successfully', data: updatedrooms });
  } catch (error) {
    console.error('Error in updateService:', error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};


exports.getAllbookRooms = async (req, res) => {
  try {
    const bookrooms = await RoomBooking.findAllbookrooms();
    console.log(bookrooms);
    return res.status(200).json({ message: 'bookroom found', data: bookrooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ['Something went wrong'] });
  }
};

exports.deletebookRooms = async (req, res) => {
  const bookroomId = req.params.id;
  try {
      const deletebookRoom = await RoomBooking.deletebookRoom(bookroomId);
      if (!deletebookRoom ) {
          return res.status(404).json({ errors: [' deletebookRoom not found'] });
      }
      return res.status(200).json({ message: 'deletebookRoom deleted successfully', data: deletebookRoom });
  } catch (error) {
      console.error(error);
      return res.status(407).json({ errors: ['Something went wrong'] });
  }
};

exports.getbookRoomsById = async (req, res) => {
  const bookroomId = req.params.id;

  try {
    const bookroom = await RoomBooking.findRoomById(bookroomId);
    if (!bookroom) {
      return res.status(404).json({ error: 'room not found' });
    }
    return res.json(bookroom); // Fix the variable name here
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};