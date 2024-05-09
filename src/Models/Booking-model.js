const pool = require('../../db');

class RoomBooking {

  constructor({ id, roomId, sessionId, date, timeSlot, bookedBy }) {
    this.id = id;
    this.roomId = roomId;
    this.sessionId = sessionId;
    this.date = date;
    this.timeSlot = timeSlot;
    this.bookedBy = bookedBy;

  }
    static async createbookRoom({ roomId, sessionId, date,timeSlot, bookedBy }) {
        const query = 'INSERT INTO RoomBookingDetails (room_id, session_id, date, time_slot,  booked_by) VALUES (?, ?, ? ,?,  ?)';
        const values = [roomId, sessionId, date, timeSlot, bookedBy];
        
        try {
            const [result] = await pool.execute(query, values);
            if (result.affectedRows !== 1) {
                throw new Error('Failed to book room');
            }
            const newcreatebookroom = new RoomBooking({
              id: result.insertId,
              roomId,
              sessionId,
              date,
              timeSlot,
              bookedBy

            });
            return  newcreatebookroom ;
        } catch (error) {
            console.error('Error in booking room:', error);
            throw error;
        }
    }

    static async findAllbookrooms() {
      const query = 'SELECT * FROM RoomBookingDetails';
    
      try {
        const [results] = await pool.execute(query);
        console.log(results);
    
        return results.map((result) => {
          return new RoomBooking({
            id: result.id,
            roomId: result.room_id,
            sessionId: result.session_id,
            date: result.date,
            timeSlot: result.time_slot,
            bookedBy: result.booked_by
          });
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async findRoomById(bookroomId) {
      const query = 'SELECT * FROM RoomBookingDetails WHERE room_id = ?';
    
      try {
        const [results] = await pool.execute(query, [bookroomId]);
        return results.map((result) => {
          return new RoomBooking({
            id: result.id,
            roomId: result.room_id,
            sessionId: result.session_id,
            date: result.date,
            timeSlot: result.time_slot,
            bookedBy: result.booked_by
          });
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async updatebookRoom(bookroomId, { roomId, sessionId, date, timeSlot, bookedBy }) {
      const updateFields = [];
    
      if (roomId !== undefined) {
        updateFields.push("roomId = ?");
      }
      if (sessionId !== undefined) {
        updateFields.push("sessionId = ?");
      }
      if (date !== undefined) {
        updateFields.push("date = ?");
      }
      if (timeSlot !== undefined) {
        updateFields.push("timeSlot = ?");

      }
      if (bookedBy !== undefined) {
        updateFields.push("bookedBy = ?");
      }
      if (updateFields.length === 0) {
        return false;
      }
    
      const query = `
        UPDATE RoomBookingDetails
        SET ${updateFields.join(", ")}
        WHERE id = ?;
      `;
    
      const params = [
        roomId,
        sessionId,
        date,
        timeSlot,
        bookedBy,
        bookroomId
      ].filter((value) => value !== undefined);
      try {
        const [results] = await pool.execute(query, params);
        return results.affectedRows > 0 ? true : false;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async deletebookRoom(bookroomId) {
      const query = 'DELETE FROM RoomBookingDetails WHERE id = ?';
    
      try {
        const [results] = await pool.execute(query, [bookroomId]);
        return results.affectedRows > 0;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

module.exports = RoomBooking;