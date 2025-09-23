'use client';

import React from 'react';
import HeatMap from '@uiw/react-heat-map';

interface HeatmapChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ data }) => {
  return (
    <HeatMap
      value={data}
      width="100%"
      style={{ color: '#ad001d' }}
      panelColors={{
        0: '#f4decd',
        8: '#e4b293',
        15: '#d48462',
        30: '#c2552c',
      }}
      legendCellSize={0}
    />
  );
};

export default HeatmapChart;
