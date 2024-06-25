const db = require('./db');

const forbiddenWords = ["filtrare", "badword", "cuvantinterzis"];

function containsForbiddenWords(message) {
    const lowerCaseMessage = message.toLowerCase();
    return forbiddenWords.some(word => lowerCaseMessage.includes(word));
}

// Obține toate mesajele
exports.getAllMessages = (req, res) => {
    const sql = "SELECT id, name, message, timestamp FROM messages ORDER BY timestamp ASC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving messages:', err);
            return res.status(500).json({ message: "Error retrieving messages" });
        }
        return res.status(200).json(results);
    });
};

// Adaugă un mesaj nou
exports.addMessage = (req, res) => {
    const { name, message } = req.body;

    if (containsForbiddenWords(message)) {
        return res.status(400).json({ message: "Message contains inappropriate content" });
    }
    
    const sql = "INSERT INTO messages (name, message) VALUES (?, ?)";
    db.query(sql, [name, message], (err, result) => {
        if (err) {
            console.error('Error adding message:', err);
            return res.status(500).json({ message: "Error adding message" });
        }
        return res.status(201).json({ message: "Message added successfully" });
    });
};
