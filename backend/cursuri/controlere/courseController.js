const Course = require('../modele/courseModel');
const algoliasearch = require('algoliasearch');

exports.getAllCourses = (req, res) => {
    Course.getAll((err, courses) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching courses' });
        }
        res.status(200).json(courses);
    });
};

exports.getCourseById = (req, res) => {
    const id = req.params.id;
    Course.getById(id, (err, course) => {
        if (err) {
            return res.status(500).send(err);
        }
            res.send(course);
    });
};

exports.createCourse = (req, res) => {
    const courseData = req.body;
    Course.create(courseData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating course' });
        }
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    });
};

exports.updateCourse = (req, res) => {
    const id = req.params.id;
    const courseData = req.body;
    Course.update(id, courseData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating course' });
        }
        res.status(200).json({ message: 'Course updated successfully' });
    });
};

exports.deleteCourse = (req, res) => {
    const id = req.params.id;
    Course.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting course' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    });
};

exports.getCoursesByLevel = (req, res) => {
    const level = req.params.level;
    Course.getByLevel(level, (err, courses) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching courses by level' });
        }
        res.status(200).json(courses);
    });
};

exports.getCoursesByCategory = (req, res) => {
    const category = req.params.category;
    Course.getByCategory(category, (err, courses) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching courses by category' });
        }
        res.status(200).json(courses);
    });
};

exports.searchCourses = (req, res) => {
    const query = req.query.q;
    const sql = 'SELECT * FROM courses WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?';
    const values = [`%${query}%`, `%${query}%`, `%${query}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching search results:', err);
            return res.status(500).json({ message: 'Error fetching search results' });
        }
        res.status(200).json(results);
    });
};

exports.getLessonById = (req, res) => {
    const lessonId = req.params.lessonId;
    Course.getLessonById(lessonId, (err, lesson) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(lesson);
    });
};


exports.getLessonsByCourseId = (req, res) => {
    const { courseId } = req.params;
    Course.getLessonById(courseId, (err, lesson) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(lesson);
    });
};