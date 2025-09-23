'use client';

import React, { useState } from 'react';

// TODO: Define a type for the quiz questions.
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: Question[];
  quizId: number;
}

const Quiz: React.FC<QuizProps> = ({ questions, quizId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    let newScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);

    // TODO: Send quiz results to the backend to update XP and streaks.
    try {
      await fetch('/api/quizzes/submit', { // Assuming this endpoint exists
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          score: newScore,
          totalQuestions: questions.length,
        }),
      });
    } catch (error) {
      console.error("Failed to submit quiz results", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Quiz completed!</p>;
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg">You scored {score} out of {questions.length}!</p>
        {/* TODO: Add a review of the answers */}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{currentQuestion.text}</h2>
      <div className="space-y-4">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
            className={`w-full text-left p-4 rounded-lg border-2 ${selectedAnswers[currentQuestion.id] === option ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900' : 'border-gray-300 dark:border-gray-600'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        {currentQuestionIndex > 0 && (
          <button onClick={() => setCurrentQuestionIndex(prev => prev - 1)} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700">Previous</button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Next</button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-600 text-white">Submit</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
