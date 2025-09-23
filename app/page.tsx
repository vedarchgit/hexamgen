import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to the Student Hub
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Your one-stop platform for notes, quizzes, and collaborative learning.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for Subject Selection */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Subjects</h2>
            <p className="text-gray-700 dark:text-gray-300">Browse and select your subjects to get started.</p>
            {/* Link to subjects page will go here */}
          </div>

          {/* Placeholder for Daily Quiz */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Daily Quiz</h2>
            <p className="text-gray-700 dark:text-gray-300">Test your knowledge with our daily quiz challenge.</p>
            {/* Link to daily quiz will go here */}
          </div>

          {/* Placeholder for Leaderboard */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Leaderboard</h2>
            <p className="text-gray-700 dark:text-gray-300">See how you rank against your peers.</p>
            {/* Link to leaderboard will go here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
