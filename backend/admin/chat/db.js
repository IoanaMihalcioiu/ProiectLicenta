const mysql = require('mysql');



const db2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "admin"
});

db2.connect((err) => {
    if (err) {
        console.error('Database 2 connection failed:', err.stack);
        return;
    }
    console.log('2Connected to database.');
});

module.exports = db2;
