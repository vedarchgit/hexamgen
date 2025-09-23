'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PyqAnalysisData {
  topic: string;
  frequency: number;
}

interface PyqChartProps {
  pyqData: PyqAnalysisData[];
}

const PyqChart: React.FC<PyqChartProps> = ({ pyqData }) => {
  const chartData = {
    labels: pyqData.map(d => d.topic),
    datasets: [
      {
        label: 'Frequency in Past Exams',
        data: pyqData.map(d => d.frequency),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'PYQ Topic Frequency',
      },
    },
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export default PyqChart;
