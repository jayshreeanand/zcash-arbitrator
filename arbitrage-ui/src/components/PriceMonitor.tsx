'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the chart
const generateMockData = () => {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  return {
    labels,
    datasets: [
      {
        label: 'ZEC/NEAR',
        data: labels.map(() => Math.random() * 10 + 90), // Random values between 90 and 100
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '24-Hour Price History',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};

export default function PriceMonitor() {
  const [chartData, setChartData] = useState<ChartData<'line'>>(() => generateMockData());
  const [currentPrice, setCurrentPrice] = useState({
    zec: 85.23,
    near: 1.45,
    ratio: 58.78,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => ({
        zec: +(prev.zec + (Math.random() - 0.5)).toFixed(2),
        near: +(prev.near + (Math.random() - 0.5) * 0.1).toFixed(2),
        ratio: +(prev.zec / prev.near).toFixed(2),
      }));

      setChartData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ZEC Price</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${currentPrice.zec}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">NEAR Price</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${currentPrice.near}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ZEC/NEAR Ratio</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentPrice.ratio}</p>
        </div>
      </div>
      <div className="h-[400px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
} 