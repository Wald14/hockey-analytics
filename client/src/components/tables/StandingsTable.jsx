// React
import { useState, useEffect } from 'react';

// Components
import { Loading } from '../'

// Utils
import { getStandings } from '../../utils/api/nhle.routes';

// React Bootstrap
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

//CSS
import './team-navbar.css'

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
      console.log(data)
    })
  }, [])

  // Loading
  if (standings.length === 0) return <Loading />

  return (
    <Table hover size='sm' responsive className='standings-table'>
      <thead>
        <tr>
          <th className='standings-sticky-one'>Pl</th>
          <th className='standings-sticky-two'>Team</th>
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
            <td className='standings-sticky-one'>{index + 1}</td>
            <td className='standings-sticky-two'>
              <Nav.Link
                href={`/team/roster/${team.teamAbbrev.default}`}
                className='standings-team-link'
              >
                <img
                  src={team.teamLogo}
                  className='standings-team-logo'
                />
                  {team.teamCommonName.default}

              </Nav.Link>
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
            <td className='standings-team-name'>{`${team.homeWins}-${team.homeLosses}-${team.homeTies}`}</td>
            <td className='standings-team-name'>{`${team.roadWins}-${team.roadLosses}-${team.roadTies}`}</td>
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