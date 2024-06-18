import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Lesson.css';

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [progressData, setProgressData] = useState({ completed: 0, remaining: 0 });

  useEffect(() => {
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

  useEffect(() => {
    const totalLessons = 4; 
    const completedLessons = parseInt(lessonId) - 1;
    const remainingLessons = totalLessons - completedLessons ;
    setProgressData({ completed: completedLessons, remaining: remainingLessons });
  }, [lessonId]);

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
      <div>
        <h2>Progres Curs</h2>
        <Bar
          data={{
            labels: ['Lecții Completate', 'Lecții Ramase'],
            datasets: [
              {
                label: 'Progres',
                data: [progressData.completed, progressData.remaining],
                backgroundColor: ['#4CAF50', '#FF6384'],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Lesson;
