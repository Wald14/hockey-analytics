// API Routes that hit the nhle.custom.routes.js file on the proxy server


// Retrieve teams divided by division
export async function getTeams() {
  try {
    const query = await fetch('/api/nhle/cust/teams')
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

// Retrieve Player FULL Game Log for certain Game Type (2=Reg, 3=Playoff)
export async function getPlayerFullGameLog(playerId, season, gameType){
  try {
    const query = await fetch(`/api/nhle/cust/player/${playerId}/game-log/${season}/${gameType}`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}