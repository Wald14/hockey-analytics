import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';

import LineChart from '../components/Charts/LinePlot';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

export default function TestPage() {
  const [percentChanceToScore, setPercentChanceToScore] = useState(null);

  async function getChartData() {
    try {
      const query = await fetch(
        '/api/nhle/cust/player/8478864/game-log/20232024/2'
      );
      const result = await query.json();
      transformChartData(result);
    } catch (err) {
      console.log(err);
    }
  }

  function transformChartData(data) {
    const shotsPerGameGoalAndGameCount = {};

    data.forEach((game) => {
      if (!shotsPerGameGoalAndGameCount[game.shots]) {
        shotsPerGameGoalAndGameCount[game.shots] = {
          goalsTotal: 0,
          gameWithAtLeastOneGoal: 0,
          gamesPlayed: 0,
        };
      }

      shotsPerGameGoalAndGameCount[game.shots].goalsTotal += game.goals;
      shotsPerGameGoalAndGameCount[game.shots].gameWithAtLeastOneGoal +=
        game.goals > 0 ? 1 : 0;
      shotsPerGameGoalAndGameCount[game.shots].gamesPlayed += 1;
    });

    const chanceOfAtLeastOneGoal = [];

    Object.keys(shotsPerGameGoalAndGameCount).forEach((key) => {
      chanceOfAtLeastOneGoal.push({
        x: key,
        y: (
          shotsPerGameGoalAndGameCount[key].gameWithAtLeastOneGoal /
          shotsPerGameGoalAndGameCount[key].gamesPlayed
        ).toFixed(2),
      });
    });

    setPercentChanceToScore(chanceOfAtLeastOneGoal);
  }

  useEffect(() => {
    getChartData();
  }, []);

  if (!percentChanceToScore) return <p>Loading...</p>;

  return (
    <>
      <h1>TEST PAGE</h1>
      <div style={{ width: '600px', height: '400px' }}>
        <LineChart
          chartTitle='% Chance of Scoring at Least One Goal Based on Shot Total'
          dataset={[
            {
              label: '% Chance to Score',
              data: percentChanceToScore,
              backgroundColor: 'rgba(75, 192, 75, 0.6)',
              borderColor: 'rgba(75, 192, 75, 1)',
              borderWidth: 1,
            },
          ]}
          xTitle='Shots'
          yTitle='% Chance to Score'
          stepSize={0.1}
          showLegend={false}
        />
      </div>
    </>
  );
}
