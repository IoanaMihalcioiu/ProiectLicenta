import React, { useState } from 'react';
import  Quiz  from 'react-quiz-component';
import { useParams, useNavigate  } from 'react-router-dom';
import { quizzes } from './quizData';

import 'chart.js/auto';

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const [quizResult, setQuizResult] = useState(null);
  const navigate = useNavigate();
  

  const handleQuizCompletion = async (result) => {
    setQuizResult(result);
    
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
    setQuizResult(null);
    navigate(0); // Reset the quiz result to retry
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
    </div>
  );
};

export default QuizPage;
