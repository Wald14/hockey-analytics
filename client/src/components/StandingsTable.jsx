import { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table'

export default function StandingsTable() {
  const [standings, setStandings] = useState([])

  async function getStandings() {
    try {
      const query = await fetch('/api/nhle/standings')
      const result = await query.json();
      setStandings(result.standings)
    } catch (err) {
      console.log('Failed to fetch standings:', err)
    }
  }

  //Run after component mounts
  useEffect(() => {
    getStandings()
  }, [])

  // Loading
  if (standings.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <Table striped bordered hover size='sm' responsive style={{textAlign: 'center', fontSize: '12px'}}>
      <thead>
        <tr>
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
        {standings.map((team) => (
          <tr key={team.teamCommonName.default}>
            <td>{team.teamCommonName.default}</td>
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