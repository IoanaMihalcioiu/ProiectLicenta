const express = require('express');
const adminController = require('../controlere/administrareController');
const router = express.Router();

router.get('/studenti', adminController.getAllStudents);
router.delete('/studenti/:id', adminController.deleteStudent);
router.put('/studenti/:id', adminController.updateStudent);

module.exports = router;
