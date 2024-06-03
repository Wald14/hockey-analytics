// https://github.com/Zmalski/NHL-API-Reference?tab=readme-ov-file#nhl-web-api-documentation

const router = require('express').Router();

const nhleBaseURL = 'https://api-web.nhle.com/v1'


// Retrieve Player Information
router.get('/player/:playerId/landing', async (req, res) => {
  try {
    const {playerId} = req.params
    const response = await fetch(`${nhleBaseURL}/player/${playerId}/landing`)
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    res.json(data)
  }catch(err){
    console.log('Error fecthing data:', err)
    res.status(500).json({err: 'Failed to data'})
  }
})

// Retrieve Player Game Log from Certain Season and Game Type (2=Reg, 3=Playoff)
router.get('/player/:playerId/game-log/:season/:gameType', async (req, res) => {
  try {
    const {playerId, season, gameType} = req.params
    const response = await fetch(`${nhleBaseURL}/player/${playerId}/game-log/${season}/${gameType}`)
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    res.json(data)
  }catch(err){
    console.log('Error fecthing play game-log:', err)
    res.status(500).json({err: 'Failed to play game-log'})
  }
})

// Retrieve Team's Current Roster
router.get('/roster/:teamAbbrev/current', async (req, res) => {
  try {
    const {teamAbbrev} = req.params
    const response = await fetch(`${nhleBaseURL}/roster/${teamAbbrev}/current`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    res.json(data)
  } catch (err) {
    console.log('Error fecthing roster:', err)
    res.status(500).json({err: 'Failed to fetch roster'})
  }
})

// Retrieve the most up to date standings
router.get('/standings', async (req, res) => {
  try {
    const response = await fetch(`${nhleBaseURL}/standings/now`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    res.json(data)
  } catch (err) {
    console.log('Error fecthing standings:', err)
    res.status(500).json({err: 'Failed to fetch standings'})
  }
})

module.exports = router;