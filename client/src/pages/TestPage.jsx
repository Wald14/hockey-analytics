import { Scatter } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export default function TestPage() {
  const [chartData, setChartData] = useState(null);

  async function getChartData() {
    try {
      const query = await fetch('/api/nhle/cust/player/8478864/game-log/20232024/2');
      const result = await query.json();

      // Transform the result into the format expected by react-chartjs-2
      const transformedData = transformChartData(result);
      setChartData(transformedData);
    } catch (err) {
      console.log(err);
    }
  }

  function transformChartData(data) {
    // No transformation needed since data is already in the correct format
    return {
      datasets: [{
        label: 'Goals vs Shots',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Goals vs Shots',
        color: 'goldenrod'
      },
    },
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Shots'
        }
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Goals'
        }
      }
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <>
      <h1>TEST PAGE</h1>
      <div style={{ width: '600px', height: '400px' }}>
      <Scatter
        options={options}
        data={chartData}
      />
      </div>
    </>
  );
}
