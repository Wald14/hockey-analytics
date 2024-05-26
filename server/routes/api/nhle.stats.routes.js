// https://github.com/Zmalski/NHL-API-Reference?tab=readme-ov-file#nhl-web-api-documentation

const router = require('express').Router();

const nhleStatsBaseURL = 'https://api.nhle.com/stats/rest'

// Retrieve country information. Returns list of all countries with a hockey presence(?)
router.get('/:language/country', async (req, res) => {
  try {
    const {language} = req.params
    const response = await fetch(`${nhleStatsBaseURL}/${language}/country`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    res.json(data)
  } catch (err) {
    console.log('Error fecthing country stats:', err)
    res.status(500).json({err: 'Failed to fetch country stats'})
  }
})

module.exports = router;