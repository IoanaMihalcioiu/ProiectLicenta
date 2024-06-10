import React, { useState,useEffect } from 'react';
import  Quiz  from 'react-quiz-component';
import { useParams, useNavigate  } from 'react-router-dom';
import { quizzes } from './quizData';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const [quizResult, setQuizResult] = useState(null);
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState({ completed: 0, remaining: 0 });

  useEffect(() => {
    const totalLessons = Object.keys(quizzes).length;
    const completedLessons = parseInt(lessonId);
    const remainingLessons = totalLessons - completedLessons;
    setProgressData({ completed: completedLessons, remaining: remainingLessons });
  }, [lessonId]);

  const handleQuizCompletion = async (result) => {
    setQuizResult(result);
    const correctAnswers = result.numberOfCorrectAnswers;
    const totalQuestions = result.numberOfQuestions;
  };

  const handleNextLesson = () => {
    const nextLessonId = parseInt(lessonId) + 1;
    if (nextLessonId <= 4) {
      navigate(`/student/cursuri/${courseId}/lessons/${nextLessonId}`);
    } else {
      navigate('/student/certificat');
    }
  };

  const handleRetryQuiz = () => {
    setQuizResult(null); // Reset the quiz result to retry
  };

   const quizData = quizzes[lessonId];

  if (!quizData) return <div>Quiz not found</div>;

  return (
    <div>
      <Quiz quiz={quizData} onComplete={handleQuizCompletion} />
      {quizResult && <div>
        <h2>Quiz Results</h2>
        <p>Correct Answers: {quizResult.numberOfCorrectAnswers}</p>
        <p>Total Questions: {quizResult.numberOfQuestions}</p>
        {quizResult.numberOfCorrectAnswers / quizResult.numberOfQuestions >= 0.75 ? (
          <button onClick={handleNextLesson}>Next</button>
        ) : (
          <button onClick={handleRetryQuiz}>Retry Quiz</button>
        )}
      </div>}
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

export default QuizPage;
