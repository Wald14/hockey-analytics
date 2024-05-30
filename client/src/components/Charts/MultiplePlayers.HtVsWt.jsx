


// Chart.js
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale);

export default function MultiplePLayersHtVsWt(playedIds) {








  const scatterData = dataset.map(data => ({
    ...data,
    type: 'scatter'
  }));

  const chartData = {
    datasets: scatterData
  };

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
          stepSize: xStepSize ? xStepSize : undefined
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
        suggestedMax: suggestedMax ? suggestedMax : undefined
      }
    }
  };

  if (!chartTitle || !dataset) return <></>

  return <Scatter options={options} data={chartData} />
}
