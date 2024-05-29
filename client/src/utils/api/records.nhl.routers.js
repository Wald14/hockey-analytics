// API Routes that hit the records.nhl.routes.js file on the proxy server


// Retrieve draft information
export async function getCountryList(year) {
  try {
    const query = await fetch(`/api/records-nhl/draft/${year}`)
    const result = await query.json()
    return result
  } catch (err) {
    console.log(err)
  }
}