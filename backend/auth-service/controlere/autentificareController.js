const bcrypt = require('bcrypt');
const db = require('../modele/db');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password.toString(), 10, (err, hash) => {
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
};

exports.login = (req, res) => {
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
                    req.session.userId = user.id;
                    return res.json({ message: "Success", role: user.role });
                } else {
                    return res.status(401).json({ message: "Invalid credentials. Please try again." });
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie('connect.sid');
        return res.json({ message: "Success" });
    });
};

exports.home = (req, res) => {
    if(req.session.role) {
        return res.json({ valid: true, role: req.session.role });
    } else {
        return res.json({ valid: false });
    }
};
