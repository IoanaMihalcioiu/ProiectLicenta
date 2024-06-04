const Course = require('../modele/courseModel');

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
            return res.status(500).json({ message: 'Error fetching course' });
        }
        res.status(200).json(course);
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
