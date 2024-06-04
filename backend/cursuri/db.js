
const mysql = require('mysql');

const db3 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cursuri"
});

db3.connect((err) => {
    if (err) {
        console.error('3Database connection failed:', err.stack);
        return;
    }
    console.log('3Connected to database.');
});

module.exports = db3;
