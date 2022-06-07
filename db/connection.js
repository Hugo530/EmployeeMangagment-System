const mysql = require("mysql2")

const connection = mysql.createConnection(
  {
      host: 'localhost',
    // MySQL username,
    user: 'root',
    
    password: '',
    database: 'employees'
  },
  console.log(`Connected to employee tracker database`)
);

module.exports = connection;
