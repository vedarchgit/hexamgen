import React from 'react';
import Quiz from '@/components/Quiz';
import { notFound } from 'next/navigation';

// Placeholder for fetching quiz data
async function getQuizData(quizId: string) {
  // In a real app, fetch from `/api/quizzes/${quizId}`
  console.log(`Fetching quiz data for quizId: ${quizId}`);
  
  // Dummy data for demonstration
  const dummyQuiz = {
    id: parseInt(quizId),
    title: 'Introduction to JavaScript Quiz',
    questions: [
      {
        id: 1,
        text: 'What does `typeof` operator do in JavaScript?',
        options: [
          'Returns the data type of a variable',
          'Checks if a variable is defined',
          'Assigns a type to a variable',
          'Concatenates two strings',
        ],
        correctAnswer: 'Returns the data type of a variable',
      },
      {
        id: 2,
        text: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['String', 'Number', 'Object', 'Boolean'],
        correctAnswer: 'Object',
      },
      {
        id: 3,
        text: 'What is the result of `2 + "2"` in JavaScript?',
        options: ['4', '22', 'TypeError', 'NaN'],
        correctAnswer: '22',
      },
    ],
  };

  if (isNaN(dummyQuiz.id)) {
    return undefined;
  }

  return dummyQuiz;
}

const QuizPage = async ({ params }: { params: { quizId: string } }) => {
  const { quizId } = params;
  const quiz = await getQuizData(quizId);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
      </header>
      <Quiz questions={quiz.questions} quizId={quiz.id} />
    </div>
  );
};

export default QuizPage;
