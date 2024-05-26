const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/standings', async (req, res) => {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/standings/now');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

app.get('/api/roster/:teamAbbrev/:season', async (req, res) => {
  try {
    const {teamAbbrev, season} = req.params
    const response = await fetch(`https://api-web.nhle.com/v1/roster/${teamAbbrev}/${season}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    res.json(data)
  } catch (error) {
    console.error('Error fetching roster:', error)
    res.status(500).json({error: 'Failed to fetch roster'})
  }
})

app.get('/api/player/:playerId/game-log/:season/:gameType', async (req, res) => {
  try {
    const {playerId, season, gameType} = req.params
    const response = await fetch(`https://api-web.nhle.com/v1/player/${playerId}/game-log/${season}/${gameType}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    res.json(data)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({error: 'Failed to fetch player data'})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
