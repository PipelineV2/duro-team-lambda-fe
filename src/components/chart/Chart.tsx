import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#F3F3F3',
      titleColor: '#333333',
      bodyColor: '#333333',
      bodyFont: {
        // size: 24,
      },
      bodySpacing: 3,
      padding: 12,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: false, // Set display to false to remove the x-axis gridlines
        borderDash: [8, 4], // Set the borderDash array to specify the length and spacing of the dashes
      },
    },
    x: {
      beginAtZero: true,
      grid: {
        lineWidth: 1,
        color: 'rgba(35, 31, 32, 0.2)',
        z: 1,
        borderDash: [8, 4],
      },
    },
  },
  elements: {
    line: {
      tension: 0.4, // Adjust the tension of the line (optional)
      borderWidth: 2, // Adjust the line width (optional)
    },
  },
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: [735, 521, 812, 191, 546, 830, 313, 286, 897, 172, 660, 495],
      borderColor: '#007F5F',
      backgroundColor: '#007F5F',
      borderWidth: 2,
    },
  ],
};

export function Chart() {
  return <Line options={options} data={data} />;
}
