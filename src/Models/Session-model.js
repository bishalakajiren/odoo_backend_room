// models/Session.js

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const pool = require('../../db');

class Session {

    constructor({ id, tokendata, expiry_Date, userid }) {
        this.id = id;
        this.tokendata = tokendata;
        this.expiry_Date = expiry_Date;
        this.userid = userid;
    }

    static async generateToken() {
        // Generate unique user ID using UUID
        const userId = uuidv4();

        const tokendata = jwt.sign({ id1: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

        const query = 'INSERT INTO Sessions (token, expiry_date, user_id) VALUES (?, ?, ?)';
        const values = [tokendata, expiryDate, userId];

        try {
            const [result] = await pool.execute(query, values);
            if (result.affectedRows !== 1) {
                throw new Error('Failed to generate session token');
            }

            const newSession = new Session({
                id: result.insertId,
                tokendata: tokendata,
                expiry_Date: expiryDate,
                userid: userId  // Use user_id here
            });

            return newSession;
        } catch (error) {
            console.error('Error in generating session token:', error);
            throw error;
        }
    }

static async findAllsessions() {
    const query = 'SELECT * FROM Sessions';
  
    try {
      const [results] = await pool.execute(query);
      console.log(results);
  
      return results.map((result) => {
        return new Session({
          id: result.id,
          userid: result.user_id,
          tokendata: result.token,
          expiry_Date: result.expiry_date
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

static async isValidToken(userId, token) {
  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded.id1 !== userId) {
          return false; // Invalid user ID
      }

      const query = 'SELECT id FROM Sessions WHERE token = ? AND user_id = ? AND expiry_date > NOW()';
      const values = [token, userId];
      const [result] = await pool.execute(query, values);
      return result.length > 0;
  } catch (error) {
      console.error('Error in validating token:', error);
      return false;
  }
}
}

module.exports = Session;
