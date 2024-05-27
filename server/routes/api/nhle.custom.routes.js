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

    // only grab needed data
    const teams = data.standings.map((team) => {
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

    // // sort teams to be in alphabetical order
    // teams.sort((a, b) => a.teamName.localeCompare(b.teamName));

    // // sort by conference
    // teams.sort((a, b) => {
    //   // First compare by divisionName
    //   const conferenceComparison = a.divisionName.localeCompare(b.divisionName);
    //   // If divisionName is the same, then compare by teamName
    //   if (conferenceComparison !== 0) {
    //     return conferenceComparison;
    //   } else {
    //     return a.teamName.localeCompare(b.teamName);
    //   }
    // })

    // Group teams by division
    const groupedTeams = teams.reduce((accumulator, team) => {
      const division = team.divisionName

      if (!accumulator[division]) {
        accumulator[division] = {
          divisionName: division,
          teams: []
        }
      }

      accumulator[division].teams.push(team);
      return accumulator;
    }, {}) // Initialize accumulator as an empty object

    // Sort teams within each division alphabetically by teamName
    for (const division in groupedTeams) {
      groupedTeams[division].teams.sort((a, b) => a.teamName.localeCompare(b.teamName));
    }

    // Convert the grouped teams object to an array and sort it by divisionName
    const sortedDivisions = Object.values(groupedTeams).sort((a, b) => a.divisionName.localeCompare(b.divisionName));

    // Respond in JSON format
    res.json(sortedDivisions);

  } catch (err) {
    console.log('Error fecthing teams:', err)
    res.status(500).json({ err: 'Failed to fetch teams' })
  }
})

module.exports = router;