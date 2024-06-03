const db = require('../modele/db');

// Obține toți cursanții
exports.getAllStudents = (req, res) => {
    const sql = "SELECT id, name, email, role FROM login WHERE role = 'student'";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ message: "Error retrieving students" });
        }
        return res.status(200).json(results);
    });
};

// Șterge un cursant
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM login WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ message: "Error deleting student" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    });
};

exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = "UPDATE login SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({ message: "Error updating student" });
        }
        return res.status(200).json({ message: "Student updated successfully" });
    });
};
