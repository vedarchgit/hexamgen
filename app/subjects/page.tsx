import React from 'react';
import Link from 'next/link';

// TODO: Define a type for the Subject
interface Subject {
  id: string;
  name: string;
}

// This is a server-side component that fetches the list of subjects.
async function getSubjects(): Promise<Subject[]> {
  // In a real app, you would fetch this from your API.
  const res = await fetch('http://localhost:3000/api/subjects');
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

const SubjectsPage = async () => {
  const subjects = await getSubjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Subjects</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Choose a subject to begin your learning journey.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <Link href={`/subjects/${subject.id}`}>
                <a className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:underline">{subject.name}</a>
              </Link>
            </div>
            <div className="mt-4">
              <Link href={`/subjects/${subject.id}/heatmap`}>
                <a className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                  View Topic Heatmap
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;
