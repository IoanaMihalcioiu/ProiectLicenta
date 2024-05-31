const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { cookie } = require("express-validator");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    db.query("INSERT INTO login (name, email, password) VALUES (?, ?, ?)", [name, email, password],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ message: "Error" });
            }
            return res.json({ message: "User created successfully." });
        }
    );
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: email=${email}, password=${password}`);

    db.query("SELECT * FROM login WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Database query error" });
        }
        console.log('Query result:', result);
        if (result.length > 0) {
            req.session.username = result[0].username;
            console.log(req.session.username);
            return res.json({ message: "Success" });
        } else {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
