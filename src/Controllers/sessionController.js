const Session = require('../Models/Session-model');
const { validationResult } = require('express-validator');

// Generate a session token
exports.generateToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const token = await Session.generateToken();
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error in generating session token:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllSession = async (req, res) => {
    try {
      const rooms = await Session.findAllsessions();
      return res.status(200).json({ message: 'Session found', data: rooms });
    } catch (error) {
        console.error(error);
        return res.status(407).json({ errors: ['Something went wrong'] });
    }
  };