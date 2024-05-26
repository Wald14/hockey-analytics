import { useState, useEffect } from 'react';

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



  //-------------------------------------
  // STYLING TO EXPORT LATER
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyleBasic = {
    border: '1px solid lightgrey',
    padding: '8px',
  };

  const cellStyleHeader = {
    border: '1px solid lightgrey',
    padding: '8px',
    backgroundColor: 'darkgreen',
  };

  const wildCellStyle = {
    // border: '1px solid lightgrey',
    // padding: '8px',
    backgroundColor: 'darkred',
  }
  //-------------------------------------

  // Loading
  if (standings.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyleHeader}>Team</th>
          <th style={cellStyleHeader}>GP</th>
          <th style={cellStyleHeader}>W</th>
          <th style={cellStyleHeader}>L</th>
          <th style={cellStyleHeader}>OTL</th>
          <th style={cellStyleHeader}>PTS</th>
          <th style={cellStyleHeader}>RW</th>
          <th style={cellStyleHeader}>ROW</th>
          <th style={cellStyleHeader}>SOW</th>
          <th style={cellStyleHeader}>SOL</th>
          <th style={cellStyleHeader}>Home</th>
          <th style={cellStyleHeader}>Away</th>
          <th style={cellStyleHeader}>GF</th>
          <th style={cellStyleHeader}>GA</th>
          <th style={cellStyleHeader}>DIFF</th>
          <th style={cellStyleHeader}>L10</th>
          <th style={cellStyleHeader}>STRK</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr key={team.teamCommonName.default} style={team.teamCommonName.default === 'Wild' ? wildCellStyle : cellStyleBasic}>
            <td style={cellStyleBasic}>{team.teamCommonName.default}</td>
            <td style={cellStyleBasic}>{team.gamesPlayed}</td>
            <td style={cellStyleBasic}>{team.wins}</td>
            <td style={cellStyleBasic}>{team.losses}</td>
            <td style={cellStyleBasic}>{team.otLosses}</td>
            <td style={cellStyleBasic}>{team.points}</td>
            <td style={cellStyleBasic}>{team.regulationWins}</td>
            <td style={cellStyleBasic}>{team.regulationPlusOtWins}</td>
            <td style={cellStyleBasic}>{team.shootoutWins}</td>
            <td style={cellStyleBasic}>{team.shootoutLosses}</td>
            <td style={cellStyleBasic}>{`${team.homeWins}-${team.homeLosses}-${team.homeTies}`}</td>
            <td style={cellStyleBasic}>{`${team.roadWins}-${team.roadLosses}-${team.roadTies}`}</td>
            <td style={cellStyleBasic}>{team.goalFor}</td>
            <td style={cellStyleBasic}>{team.goalAgainst}</td>
            <td style={cellStyleBasic}>{team.goalDifferential}</td>
            <td style={cellStyleBasic}>{`${team.l10Wins}-${team.l10Losses}-${team.l10Ties}`}</td>
            <td style={cellStyleBasic}>{team.streakCode}{team.streakCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}