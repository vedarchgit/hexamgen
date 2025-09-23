import React from 'react';

// This page will be the main hub for a specific subject.
// It will fetch and display notes, quizzes, PYQs, and other relevant information.

// TODO: Fetch subject details based on the subjectId parameter.
// TODO: Fetch and display a list of notes for this subject.
// TODO: Fetch and display a list of quizzes for this subject.
// TODO: Provide a link to the PYQ analysis page for this subject.
// TODO: Display the topic heatmap for this subject.

const SubjectPage = ({ params }: { params: { subjectId: string } }) => {
  const { subjectId } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Subject: {subjectId}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Explore all the resources available for this subject.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Notes</h2>
          {/* Placeholder for Notes List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-300">Notes for this subject will be listed here.</p>
          </div>
        </div>

        <div className="lg:row-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quizzes</h2>
          {/* Placeholder for Quizzes List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <p className="text-gray-700 dark:text-gray-300">Quizzes will be listed here.</p>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">PYQ Analysis</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-300">Past Year Question analysis will be displayed here.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Topic Heatmap</h2>
           {/* Placeholder for Heatmap */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
             <p className="text-gray-700 dark:text-gray-300">A topic heatmap will be shown here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
