// https://github.com/Zmalski/NHL-API-Reference?tab=readme-ov-file#nhl-web-api-documentation

const router = require('express').Router();

const nhleBaseURL = 'https://api-web.nhle.com/v1'

// Retrieve the most up to date standings
router.get('/teams', async (req, res) => {
  try {
    const response = await fetch(`${nhleBaseURL}/standings/now`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();

    const teams = data.standings.map((team)=>{
      return (
        {
          conferenceAbbrev: team.conferenceAbbrev,
          conferenceName: team.conferenceName,
          divisionAbbrev: team.divisionAbbrev,
          divisionName: team.divisionName,
          seasonId: team.seasonId,
          teamName: team.teamName.default,
          teamCommonName: team.teamCommonName.default,
          teamAbbrev: team.teamAbbrev.default,
          teamLogo: team.teamLogo,
        }
      )
    })

    res.json(teams)
  } catch (err) {
    console.log('Error fecthing teams:', err)
    res.status(500).json({err: 'Failed to fetch teams'})
  }
})

module.exports = router;