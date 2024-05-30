// React
import { useState, useEffect } from 'react';

// Chart
import LineChart from './LinePlot';

// ChartJS
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale, } from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale);

// React Boostrap
import Placeholder from 'react-bootstrap/Placeholder'

export default function PercentChanceToScore({ playerId, season, gameType }) {
  const [percentChanceToScore, setPercentChanceToScore] = useState(null);
  const [gameTotal, setGameTotal] = useState()

  async function getChartData() {
    try {
      const query = await fetch(`/api/nhle/cust/player/${playerId}/game-log/${season}/${gameType}`);
      const result = await query.json();
      transformChartData(result);
      setGameTotal(result.length)
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

  if (!percentChanceToScore)
    return (
      <Placeholder as="p" animation="wave">
        <Placeholder className="w-75" style={{ width: '600px', height: '400px' }} />
      </Placeholder>
    );

  return (
    <>
      <div style={{ width: '600px', height: '400px' }}>
        <LineChart
          chartTitle={`% Chance of Scoring at Least One Goal Based on Shot Total (${gameTotal} games played)`}
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
          xStepSize={1}
          yStepSize={0.1}
          showLegend={false}
          suggestedMax={1}
        />
      </div>
    </>
  );
}
