const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//THESE LINES ARE FOR GETTING THE DATA FROM THE DATABASE//    
const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;
