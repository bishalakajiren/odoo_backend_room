const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'backend-odoo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// console.log(pool);

pool.query('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to database:', err));

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_DATABASE);

module.exports = pool;
