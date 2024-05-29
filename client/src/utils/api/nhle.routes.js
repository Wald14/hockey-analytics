
export async function getPlayer(playerId) {
  try {
    const query = await fetch(`/api/nhle/player/${playerId}/landing`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}


export async function getRoster(teamAbbrev) {
  try {
    const query = await fetch(`/api/nhle/roster/${teamAbbrev}`)
    const results = await query.json()
    return results
  } catch (err) {
    console.log(err)
  }
}


export async function getStandings() {
  try {
    const query = await fetch('/api/nhle/standings')
    const result = await query.json();
    return result
  } catch (err) {
    console.log('Failed to fetch standings:', err)
  }
}


export async function getTeams() {
  try {
    const query = await fetch('/api/nhle/cust/teams')
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}