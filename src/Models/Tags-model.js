const pool = require('../../db');

class Tag {


  constructor({ id,name }) {
    this.id = id;
    this.name = name;

  }
    static async create({ name }) {
        const query = 'INSERT INTO Tags (name) VALUES (?)';
        const values = [name];

        try {
            const [result] = await pool.execute(query, values);
            if (result.affectedRows !== 1) {
                throw new Error('Failed to create tag');
            }
            return { id: result.insertId, name };
        } catch (error) {
            console.error('Error in creating tag:', error);
            throw error;
        }
    }
    static async findAlltags() {
      const query = 'SELECT * FROM Tags';
  
      try {
        const [results] = await pool.execute(query);
        return results.map((result) => new Tag(result));
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async findtagById(tagId) {
      const query = 'SELECT * FROM Tags WHERE id = ?';
    
      try {
        const [results] = await pool.execute(query, [tagId]);
        return results.length ? new Tag(results[0]) : null;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async updatetag(tagId, { name }) {
      const updateFields = [];
    
      if (name !== undefined) {
        updateFields.push("name = ?");
      }
      if (updateFields.length === 0) {
        return false;
      }
    
      const query = `
        UPDATE Tags
        SET ${updateFields.join(", ")}
        WHERE id = ?;
      `;
    
      const params = [
       name,
       tagId
      ].filter((value) => value !== undefined);
      try {
        const [results] = await pool.execute(query, params);
        return results.affectedRows > 0 ? true : false;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    static async deletetag(tagId) {
      const query = 'DELETE FROM Tags WHERE id = ?';
    
      try {
        const [results] = await pool.execute(query, [tagId]);
        return results.affectedRows > 0;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

module.exports = Tag;