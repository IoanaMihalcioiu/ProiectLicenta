const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt =  require ('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json());

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

const SECRET_KEY = 'your_jwt_secret_key';

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO login (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword],
             (err, result) => {
                if (err) {
                  console.error('Error executing query:', err);
                  return res.status(500).json({ message: "Error" });
                }
                 return res.json({ message: "User created successfully.", result });
            }
         );
    }catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: email=${email}`);

    db.query("SELECT * FROM login WHERE email = ? AND password = ?", [email, password], async (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
        }
        if (result.length > 0) {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = jwt.sign({email:user.email}, SECRET_KEY, {expiresIn: '1h'});
                return res.json({ message: "Success", token });
            }else {
                return res.status(401).json({ message: "Invalid credentials. Please try again." });
            }
        } else {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }      
    });
});


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
