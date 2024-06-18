import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './CursuriStudenti.css';

function Cursuri() {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState('');

    
    const fetchCourses = useCallback( async () => {
        try {
            let response;
            if (filter) {
                response = await axios.get(`http://localhost:8083/student/cursuri/${filter}`);
            } else {
                response = await axios.get('http://localhost:8083/student/cursuri');
            }
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }, [filter]);
    
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return (
        <div className="cursuri-container">
            <h1>Cursuri</h1>
            <div className="button-group">
                <button className="filter-button" onClick={() => setFilter('level/beginner')}>Începător</button>
                <button className="filter-button" onClick={() => setFilter('level/intermediate')}>Intermediar</button>
                <button className="filter-button" onClick={() => setFilter('level/advanced')}>Avansat</button>
                <button className="filter-button" onClick={() => setFilter('category/programming')}>Programare</button>
                <button className="filter-button" onClick={() => setFilter('category/important')}>Important</button>
                <button className="filter-button" onClick={() => setFilter('category/matematics')}>Matematica</button>
                <button className="filter-button" onClick={() => setFilter('category/signals')}>Semnale</button>
                <button className="filter-button" onClick={() => setFilter('category/circuits')}>Circuite</button>
                <button className="filter-button" onClick={() => setFilter('')}>Toate cursurile</button>
            </div>
            <ul className="course-list">
                {courses.map(course => (
                    <li key={course.id} className="course-item">
                        <h2>{course.name}</h2>
                        <p>Nivel: {course.level}</p>
                         <p>Categorie: {course.category}</p>
                         <Link to={`/student/start-course/${course.id}`}>Start Course</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cursuri
