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