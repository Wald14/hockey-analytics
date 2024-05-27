// https://github.com/Zmalski/NHL-API-Reference?tab=readme-ov-file#nhl-web-api-documentation

const router = require('express').Router();

const nhleBaseURL = 'https://api-web.nhle.com/v1'

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

// Retrieve Team's Current Roster
router.get('/roster/:teamAbbrev', async (req, res) => {
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

module.exports = router;