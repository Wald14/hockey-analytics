// Chart.js
import { Scatter } from 'react-chartjs-2';

export default function ScatterChart({ chartTitle, data, stepSize }) {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
        color: "goldenrod"
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: stepSize ? stepSize : 1
        }
      }
    }
  };

  if (!chartTitle || !data) return <></>

  return (
      <Scatter options={options} data={data} style={{height: "300px"}}/>
  )
}