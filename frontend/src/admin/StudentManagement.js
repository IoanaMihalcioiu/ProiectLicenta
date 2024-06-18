import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditStudent from './EditStudent';
import './EditStudent.css';
import './StudentManagement.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8082/admin/studenti', { withCredentials: true });
            console.log('Fetched students:', response.data);
            setStudents(response.data);
            setTotalStudents(response.data.length);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/admin/studenti/${id}`, { withCredentials: true });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEdit = (student) => {
        console.log('Editing student:', student);
        setEditingStudent(student);
        console.log('Editing student state after set:', student);
    };

    const handleSave = async (id, name, email) => {
        console.log('Saving student:', { id, name, email });
        try {
            await axios.put(`http://localhost:8082/admin/studenti/${id}`, { name, email }, { withCredentials: true });
            setEditingStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    useEffect(() => {
        console.log("Editing student state changed:", editingStudent);
    }, [editingStudent]);


    return (
        <div className="student-management">
            <h2>Gestionare Cursanți</h2>
            <div className="total-students-box">
                <strong>Număr total de studenți: {totalStudents}</strong>
            </div>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="3">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {editingStudent && (
                <EditStudent
                    student={editingStudent}
                    onSave={handleSave}
                    onClose={() => setEditingStudent(null)}
                />
            )}
        </div>
    );
}

export default StudentManagement;
