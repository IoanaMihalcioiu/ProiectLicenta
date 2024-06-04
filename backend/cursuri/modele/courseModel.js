const db3 = require('../db');

const Course = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM courses';
        db3.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching courses:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM courses WHERE id = ?';
        db3.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error fetching course:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },
    create: (courseData, callback) => {
        const sql = 'INSERT INTO courses (name, level, category) VALUES (?, ?, ?)';
        db3.query(sql, [courseData.name, courseData.level, courseData.category], (err, result) => {
            if (err) {
                console.error('Error creating course:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },
    update: (id, courseData, callback) => {
        const sql = 'UPDATE courses SET name = ?, level = ?, category = ? WHERE id = ?';
        db3.query(sql, [courseData.name, courseData.level, courseData.category, id], (err, result) => {
            if (err) {
                console.error('Error updating course:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM courses WHERE id = ?';
        db3.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting course:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },
    getByLevel: (level, callback) => {
        const sql = 'SELECT * FROM courses WHERE level = ?';
        db3.query(sql, [level], (err, results) => {
            if (err) {
                console.error('Error fetching courses by level:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },
    getByCategory: (category, callback) => {
        const sql = 'SELECT * FROM courses WHERE category = ?';
        db3.query(sql, [category], (err, results) => {
            if (err) {
                console.error('Error fetching courses by category:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },
    getAll: (callback) => {
        const sql = 'SELECT id, name, level, category FROM courses';
        db3.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching courses:', err);
                return callback(err);
            }
            // Adăugăm un obiect 'objectID' pentru Algolia
            const courses = results.map(course => ({
                ...course,
                objectID: course.id.toString(),
            }));
            callback(null, courses);
        });
    }
};

module.exports = Course;
