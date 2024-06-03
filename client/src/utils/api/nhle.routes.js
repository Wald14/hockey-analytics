// API Routes that hit the nhle.routes.js file on the proxy server


// Retrieve Player Information
export async function getPlayerInfo(playerId) {
  try {
    const query = await fetch(`/api/nhle/player/${playerId}/landing`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}


// Retrieve Player Game Log from Certain Season and Game Type (2=Reg, 3=Playoff)
export async function getPlayerGameLog(playerId, season, gameType) {
  try {
    const query = await fetch(`/api/nhle/player/${playerId}/game-log/${season}/${gameType}`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}


// Retrieve Team's Current Roster
export async function getCurrentRoster(teamAbbrev) {
  try {
    const query = await fetch(`/api/nhle/roster/${teamAbbrev}/current`)
    const results = await query.json()
    return results
  } catch (err) {
    console.log(err)
  }
}


// Retrieve the most up to date standings
export async function getStandings() {
  try {
    const query = await fetch('/api/nhle/standings')
    const result = await query.json();
    return result
  } catch (err) {
    console.log('Failed to fetch standings:', err)
  }
}