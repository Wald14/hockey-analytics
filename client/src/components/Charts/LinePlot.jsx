/* 
Takes in an array of datasets
Each dataset should look like: 
  {
    label: '',
    data: data in the form of an arr of [x; num, y: num],
    backgroundColor: '',
    borderColor: ',
    borderWidth: 1,
  }
*/

// Chart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale);


export default function LineChart({ chartTitle, dataset, xTitle, yTitle, xStepSize, yStepSize, showLegend, suggestedMax }) {

  const chartData = {
    datasets: dataset
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: true,
        text: chartTitle,
        color: 'black'
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: xTitle,
        },
        ticks: {
          stepSize: xStepSize ? xStepSize : ''
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: yTitle,
        },
        ticks: {
          stepSize: yStepSize ? yStepSize : 1
        },
        suggestedMax: suggestedMax ? suggestedMax : ''
      }
    }
  };

  if (!chartTitle || !dataset) return <></>

  return <Line options={options} data={chartData} />
}
