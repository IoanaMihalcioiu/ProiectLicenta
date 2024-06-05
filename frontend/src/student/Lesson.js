import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Lesson.css';

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    console.log("lessonId:", lessonId);
    console.log("Course ID:", courseId);
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/student/cursuri/lessons/${lessonId}`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId, courseId]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="lesson-container">
      <div className="lesson-title">
        <h1>{lesson.title}</h1>
      </div>
      <div className="lesson-content">
        <p>{lesson.content}</p>
      </div>
      <div className="next-button">
        <Link to={`/student/cursuri/${courseId}/quiz/${lessonId}`}>Next</Link>
      </div>
    </div>
  );
};

export default Lesson;
