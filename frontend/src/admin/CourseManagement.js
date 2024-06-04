import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseManagement.css'; // Importăm fișierul CSS

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', level: '', category: '' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8083/admin/cursuri');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/admin/cursuri/${id}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleAddCourse = async () => {
        try {
            await axios.post('http://localhost:8083/admin/cursuri', newCourse);
            setNewCourse({ name: '', level: '', category: '' });
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleUpdateCourse = async () => {
        try {
            await axios.put(`http://localhost:8083/admin/cursuri/${editingCourse.id}`, editingCourse);
            setEditingCourse(null);
            fetchCourses();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingCourse) {
            setEditingCourse({ ...editingCourse, [name]: value });
        } else {
            setNewCourse({ ...newCourse, [name]: value });
        }
    };

    return (
        <div className="course-management">
            <div className="course-form">
                <h2>{editingCourse ? 'Editează Curs' : 'Adaugă Curs'}</h2>
                <input
                    type="text"
                    name="name"
                    value={editingCourse ? editingCourse.name : newCourse.name}
                    onChange={handleInputChange}
                    placeholder="Nume Curs"
                />
                <input
                    type="text"
                    name="level"
                    value={editingCourse ? editingCourse.level : newCourse.level}
                    onChange={handleInputChange}
                    placeholder="Nivel"
                />
                <input
                    type="text"
                    name="category"
                    value={editingCourse ? editingCourse.category : newCourse.category}
                    onChange={handleInputChange}
                    placeholder="Categorie"
                />
                <button onClick={editingCourse ? handleUpdateCourse : handleAddCourse}>
                    {editingCourse ? 'Actualizează Curs' : 'Adaugă Curs'}
                </button>
            </div>
            <div className="course-list">
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <h2>{course.name}</h2>
                        <p>Nivel: {course.level}</p>
                        <p>Categorie: {course.category}</p>
                        <div>
                            <button onClick={() => handleEditCourse(course)}>Editează</button>
                            <button onClick={() => handleDeleteCourse(course.id)}>Șterge</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseManagement;
