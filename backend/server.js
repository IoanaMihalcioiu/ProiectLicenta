const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const bcrypt = require ('bcrypt')

const salt = 10;

const app = express();
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
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

    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: "Error hashing password" });
        }

        const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
        const values = [name, email, hash];

        db.query(sql, values, (err) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ message: "Error inserting user" });
            }
            return res.status(201).json({ message: "User created successfully." });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM login WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Database query error" });
        }

        if (result.length > 0) {
            const user = result[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing password:', err);
                    return res.status(500).json({ message: "Error comparing password" });
                }

                if (isMatch) {
                    req.session.role = user.role;
                    return res.json({ message: "Success" });
                } else {
                    return res.status(401).json({ message: "Invalid credentials. Please try again." });
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }
    });
});

app.get('/home', (req, res) => {
    if(req.session.role) {
        return res.json({ valid: true, role: req.session.role})
    } else {
        return res.json({ valid: false})
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie('connect.sid');
        return res.json({ message: "Success" });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
