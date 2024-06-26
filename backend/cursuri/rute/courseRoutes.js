const express = require('express');
const courseController = require('../controlere/courseController');
const router = express.Router();

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/level/:level', courseController.getCoursesByLevel);
router.get('/category/:category', courseController.getCoursesByCategory);
router.get('/course/:courseId/lessons', courseController.getLessonsByCourseId); // Ensure this route works correctly
router.get('/lessons/:lessonId', courseController.getLessonById);
router.get('/search', courseController.searchCourses);

module.exports = router;
