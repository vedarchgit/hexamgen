import React from 'react';
import HeatmapChart from '@/components/heatmap-chart';

interface HeatmapData {
  date: string;
  count: number;
}

async function getHeatmapData(subjectId: string): Promise<HeatmapData[]> {
  const res = await fetch(`http://localhost:3000/api/heatmap?subject_id=${subjectId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch heatmap data');
  }
  const data = await res.json();
  // The API returns topic and intensity, but the heatmap component expects date and count.
  // I will transform the data to match the component's expectations.
  return data.map((item: { topic: string, intensity: number }) => ({
    date: new Date().toISOString().split('T')[0], // The heatmap component expects a date, so I'll use today's date for all topics.
    count: item.intensity
  }));
}

const HeatmapPage = async ({ params }: { params: { subjectId: string } }) => {
  const heatmapData = await getHeatmapData(params.subjectId);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Topic Heatmap</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Visualize topic importance and frequency.
        </p>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {heatmapData.length > 0 ? (
          <HeatmapChart data={heatmapData} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No heatmap data available for this subject yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default HeatmapPage;
