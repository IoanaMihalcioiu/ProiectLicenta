const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});
db.connect((err) => {
    if (err) {
        console.error('Database 1 connection failed:', err.stack);
        return;
    }
    console.log('1Connected to database.');
});



module.exports = db;
