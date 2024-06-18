import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const StartCourse = () => {
  const { courseId } = useParams();
  const [firstLessonId, setFirstLessonId] = useState(null);

  useEffect(() => {
    const fetchFirstLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/student/cursuri/course/${courseId}/lessons`);
        console.log('Lessons response:', response.data);
        if (response.data && response.data.id) {
          setFirstLessonId(response.data.id); 
        }else {
          console.error('No lessons found for this course');
        }
      } catch (error) {
        console.error('Error fetching first lesson:', error);
      }
    };

    fetchFirstLesson();
  }, [courseId]);

  if (firstLessonId === null) return <div>Loading...</div>;

  return (
    <div>
      <h1>Bine ai venit la curs</h1>
      <p>Pentru a putea promova cursul trebuie sa ai minim 75% raspunsuri corecte.</p>
      <p>Apasa "Next" pentru a parcurge prima lectie.</p>
      <Link to={`/student/cursuri/${courseId}/lessons/${firstLessonId}`}>Next</Link>
    </div>
  );
};

export default StartCourse;
