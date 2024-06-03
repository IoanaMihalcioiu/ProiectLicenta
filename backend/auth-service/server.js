const express = require("express");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./rute/autentificare');
const db = require('./modele/db');

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
}));

app.use('/autentificare', authRoutes);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Serviciul de autentificare rulează pe portul ${PORT}`);
});
