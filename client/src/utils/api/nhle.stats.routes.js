// API Routes that hit the nhle.stats.routes.js file on the proxy server


// Retrieve country information. Returns list of all countries with a hockey presence(?)
export async function getCountryList(language) {
  try {
    const query = await fetch(`/api/nhle-stats/${language}/country`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}