const pool = require("../../db");

class Room {
  constructor({ id, name, capacity, location, description }) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.location = location;
    this.description = description;

  }

  static async create({ name, capacity, location, description }) {
    const query = 'INSERT INTO rooms (name, capacity, location, description) VALUES (?, ?, ?, ?)';
    const values = [name, capacity, location, description];
    console.log(values)
    try {
      const [result] = await pool.execute(query, values);

      if (result.affectedRows !== 1) {
        throw new Error('Rooms creation failed');
      }

      const newcreateroom = new Room({
        id: result.insertId,
        name,
        capacity,
        location,
        description
      });

      return newcreateroom;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async findAllrooms() {
    const query = 'SELECT * FROM rooms';

    try {
      const [results] = await pool.execute(query);
      return results.map((result) => new Room(result));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

static async findRoomById(roomId) {
  const query = 'SELECT * FROM rooms WHERE id = ?';

  try {
    const [results] = await pool.execute(query, [roomId]);
    return results.length ? new Room(results[0]) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

static async updateRoom(roomId, { name, capacity, location, description }) {
  const updateFields = [];

  if (name !== undefined) {
    updateFields.push("name = ?");
  }
  if (capacity !== undefined) {
    updateFields.push("capacity = ?");
  }
  if(location !== undefined) {
    updateFields.push("location = ?");
  }
  if(description !== undefined) {
    updateFields.push("description = ?");
  }
  if (updateFields.length === 0) {
    return false;
  }

  const query = `
    UPDATE rooms
    SET ${updateFields.join(", ")}
    WHERE id = ?;
  `;

  const params = [
    name, 
    capacity, 
    location, 
    description,
    roomId,
  ].filter((value) => value !== undefined);
  try {
    const [results] = await pool.execute(query, params);
    return results.affectedRows > 0 ? true : false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

static async deleteRoom(roomId) {
  const query = 'DELETE FROM rooms WHERE id = ?';

  try {
    const [results] = await pool.execute(query, [roomId]);
    return results.affectedRows > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


}



module.exports = Room;
