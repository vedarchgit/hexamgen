import React from 'react';
import PyqChart from '@/components/pyq-chart';

interface PyqAnalysisData {
  topic: string;
  frequency: number;
}

async function getPyqAnalysisData(): Promise<PyqAnalysisData[]> {
  const res = await fetch('http://localhost:3000/api/pyq/analyze', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch PYQ analysis data');
  }
  return res.json();
}

const PyqAnalysisPage = async () => {
  const pyqData = await getPyqAnalysisData();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Past Year Question Analysis</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Identify high-yield topics based on past exam trends.
        </p>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {pyqData.length > 0 ? (
          <PyqChart pyqData={pyqData} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No PYQ analysis data available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default PyqAnalysisPage;
