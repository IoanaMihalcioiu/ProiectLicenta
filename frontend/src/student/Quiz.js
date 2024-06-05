import React, { useState } from 'react';
import  Quiz  from 'react-quiz-component';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const quizData = {
  quizTitle: "Quiz Title",
  questions: [
    {
      question: "Question 1",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correctAnswer: "1"
    },
    {
      question: "Question 2",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correctAnswer: "2"
    }
  ]
};

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const [quizResult, setQuizResult] = useState(null);

  const handleQuizCompletion = async (result) => {
    setQuizResult(result);
    const correctAnswers = result.numberOfCorrectAnswers;
    const totalQuestions = result.numberOfQuestions;

    if (correctAnswers / totalQuestions >= 0.75) {
      alert('You can proceed to the next lesson.');
      // logic to unlock next lesson
    } else {
      alert('You need to score at least 75% to proceed to the next lesson.');
    }
  };

  return (
    <div>
      <Quiz quiz={quizData} onComplete={handleQuizCompletion} />
      {quizResult && <div>
        <h2>Quiz Results</h2>
        <p>Correct Answers: {quizResult.numberOfCorrectAnswers}</p>
        <p>Total Questions: {quizResult.numberOfQuestions}</p>
      </div>}
    </div>
  );
};

export default QuizPage;
