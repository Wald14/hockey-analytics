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









// Retrieve Player FULL Game Log for certain Game Type (2=Reg, 3=Playoff)
// Retrieve Player FULL Game Log for certain Game Type (2=Reg, 3=Playoff)
router.get('/player/:playerId/game-log/:season/:gameType', async (req, res) => {
  try {
    //----------------------------------
    const filterKey = 'goals'
    const filterCondition = '> 2'

    console.log(req.query)


    const { playerId, season, gameType } = req.params;
    const response = await fetch(`${nhleBaseURL}/player/${playerId}/game-log/${season}/${gameType}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const seasonArr = data.playerStatsSeasons
      .map(season => season.season)
      .filter(season => season != data.seasonId);

      data.gameLog.forEach(game => game.seasonId = data.seasonId)

    let gamesArr = data.gameLog;

    const fetchSeasonData = async (season) => {
      const response = await fetch(`${nhleBaseURL}/player/${playerId}/game-log/${season}/${gameType}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const seasonData = await response.json();

      seasonData.gameLog.forEach(game => game.seasonId = seasonData.seasonId)

      return seasonData.gameLog;
    };

    const seasonDataPromises = seasonArr.map(season => fetchSeasonData(season));

    const seasonDataResults = await Promise.all(seasonDataPromises);

    seasonDataResults.forEach(seasonGames => {
      gamesArr = gamesArr.concat(seasonGames);
    });

    const shotsVsGoals = []
    
    gamesArr.forEach(game=>{
      shotsVsGoals.push({
        x: game.shots,
        y: game.goals
      })
    })

    res.json(shotsVsGoals)

    // res.json(gamesArr.filter(game => game[filterKey] > 2));
  } catch (err) {
    console.error('Error fetching full game-log:', err);
    res.status(500).json({ err: 'Failed to fetch full game-log' });
  }
});

module.exports = router;


// module.exports = router;

// Request Example: GET /player/:playerId/game-log/:season/:gameType?filters={"goals":">2"}
// GET /player/:playerId/game-log/:season/:gameType?filters={"goals":">2","assists":">=1","opponentCommonName.default":"Kraken"}