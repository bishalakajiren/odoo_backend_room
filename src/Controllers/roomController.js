const Rooms = require('../Models/Room-model');
const { validationResult } = require('express-validator');

exports.createRooms = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  

  const { name, capacity, location, description } = req.body;
  try {
      
    const newcreateroom = await Rooms.create({
     name,
     capacity,
     location,
     description
    });

    return res.status(200).json({ message: 'Room Data', data: newcreateroom });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};

exports.updateRooms = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  const roomId = req.params.id;
  const {  name,capacity,location,description } = req.body;
 
  try {
    const updatedrooms = await Rooms.updateRoom(roomId, {
      name,
      capacity,
      location,
      description
    });

    const findUpdatedrooms = await Rooms.findRoomById(roomId);
    return res.status(200).json({ message: 'Service updated successfully', data: updatedrooms });
  } catch (error) {
    console.error('Error in updateService:', error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.findAllrooms();
    return res.status(200).json({ message: 'Category found', data: rooms });
  } catch (error) {
      console.error(error);
      return res.status(407).json({ errors: ['Something went wrong'] });
  }
};

exports.deleteRooms = async (req, res) => {
  const roomId = req.params.id;
  try {
      const deleteRoom = await Rooms.deleteRoom(roomId);
      if (!deleteRoom ) {
          return res.status(404).json({ errors: ['Category not found'] });
      }
      return res.status(200).json({ message: 'Category deleted successfully', data: deleteRoom  });
  } catch (error) {
      console.error(error);
      return res.status(407).json({ errors: ['Something went wrong'] });
  }
};


exports.getRoomsById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const room = await Rooms.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'room not found' });
    }
    return res.json(room);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};



