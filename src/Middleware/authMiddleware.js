// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Session = require('../Models/Session-model'); // Adjust the path as needed

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded',decoded);
    const userId = decoded.id1;

    const isValid = await Session.isValidToken(userId, token);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.userId = userId; // Attach the user ID to the request
    next(); // Continue to the next middleware
  } catch (error) {
    console.error('Error in verifying token:', error);
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = { verifyToken };
