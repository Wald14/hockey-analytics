// React
import { useState, useEffect } from 'react';

// Utils -> Api routes
import { getStandings } from '../utils/api/nhle.routes';

// React Bootstrap
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'


export default function StandingsTable() {

  const [standings, setStandings] = useState([])

  // Currently not using this part of the dataset that is returned
  // Putting this here as a reminder that this is also included in data set
  const [wildCardIndicator, setWildCardIndicator] = useState()

  // Fetch standings data
  useEffect(() => {
    getStandings().then(data => {
      setStandings(data.standings)
      setWildCardIndicator(data.wildCardIndicator)
    })
  }, [])

  // Loading
  if (standings.length === 0) return <p>Loading...</p>

  return (
    <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
      <thead>
        <tr>
          <th>Pl</th>
          <th>Team</th>
          <th>GP</th>
          <th>W</th>
          <th>L</th>
          <th>OTL</th>
          <th>PTS</th>
          <th>RW</th>
          <th>ROW</th>
          <th>SOW</th>
          <th>SOL</th>
          <th>Home</th>
          <th>Away</th>
          <th>GF</th>
          <th>GA</th>
          <th>DIFF</th>
          <th>L10</th>
          <th>STRK</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team, index) => (
          <tr key={team.teamCommonName.default}>
            <td>{index + 1}</td>
            <td>
              <div style={{display: 'flex'}}>
                <Nav.Link
                  href={`/team/roster/${team.teamAbbrev}`}
                  style={{ textDecoration: 'underline' }}>
                <img src={team.teamLogo} style={{ width: '32px', borderRadius: '50%' }} />
                  {team.teamCommonName.default}
                </Nav.Link>
              </div>
            </td>
            <td>{team.gamesPlayed}</td>
            <td>{team.wins}</td>
            <td>{team.losses}</td>
            <td>{team.otLosses}</td>
            <td>{team.points}</td>
            <td>{team.regulationWins}</td>
            <td>{team.regulationPlusOtWins}</td>
            <td>{team.shootoutWins}</td>
            <td>{team.shootoutLosses}</td>
            <td>{`${team.homeWins}-${team.homeLosses}-${team.homeTies}`}</td>
            <td>{`${team.roadWins}-${team.roadLosses}-${team.roadTies}`}</td>
            <td>{team.goalFor}</td>
            <td>{team.goalAgainst}</td>
            <td>{team.goalDifferential}</td>
            <td>{`${team.l10Wins}-${team.l10Losses}-${team.l10Ties}`}</td>
            <td>{team.streakCode}{team.streakCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}