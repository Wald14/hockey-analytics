// React & React-Router-Dom
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Components -> Charts
import PercentChanceToScore from '../components/Charts/PercentChanceToScore'

// Utils -> Api Routes
import { getPlayerInfo } from '../utils/api/nhle.routes'

// Utils -> Math
import { calculatePROD } from '../utils/math'

// React Bootstrap
import Table from 'react-bootstrap/Table'


export default function PlayerPage() {

  const { playerId } = useParams()

  const [player, setPlayer] = useState()

  // Run these after component mounts
  useEffect(() => {
    getPlayerInfo(playerId).then(data => setPlayer(data))
  }, [playerId])

  // Loading
  if (!player) return <p>Loading...</p>

  return (
    <>
      <div style={{ display: 'flex', margin: '50px' }}>
        <div style={{ display: 'flex' }}>
          <img src={player.headshot} style={{ width: '100px' }} />
          <h2>{player.firstName.default} {player.lastName.default}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: "column", margin: '0px 50px' }}>
        <h3>Season Log</h3>
        <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
          <caption>
            <p style={{ margin: '0px' }}>GP: Games Played</p>
            <p style={{ margin: '0px' }}>G: Goals</p>
            <p style={{ margin: '0px' }}>A: Assists</p>
            <p style={{ margin: '0px' }}>PTS: Points (Goals + Assists)</p>
            <p style={{ margin: '0px' }}>SOG: Shots on Goal</p>
            <p style={{ margin: '0px' }}>SCPT: Scoring Percentage (Goals/Shots)</p>
            <p style={{ margin: '0px' }}>PPG: Power Play Goals</p>
            <p style={{ margin: '0px' }}>PPG: Power Play Assists</p>
            <p style={{ margin: '0px' }}>SHG: Short Handed Goals</p>
            <p style={{ margin: '0px' }}>SHA: Short Handed Assists</p>
            <p style={{ margin: '0px' }}>GWG: Game Winning Goals</p>
            <p style={{ margin: '0px' }}>TOI/G: Time On Ice per Game</p>
            <p style={{ margin: '0px' }}>PROD-g: Average ice time per goal recorded</p>
            <p style={{ margin: '0px' }}>PROD-a: Average ice time per assist recorded</p>
            <p style={{ margin: '0px' }}>PROD-p: Average ice time per point recorded</p>
          </caption>
          <thead>
            <tr>
              <th>Season</th>
              <th>League</th>
              <th>Team</th>
              <th>GP</th>
              <th>G</th>
              <th>A</th>
              <th>PTS</th>
              <th>+/-</th>
              <th>PIM</th>
              <th>SOG</th>
              <th>SCPT</th>
              <th>PPG</th>
              <th>PPA</th>
              <th>SHG</th>
              <th>SHA</th>
              <th>GWG</th>
              <th>TOI/G</th>
              <th style={{ fontSize: '8px' }}>PROD-g</th>
              <th style={{ fontSize: '8px' }}>PROD-a</th>
              <th style={{ fontSize: '8px' }}>PROD-p</th>
            </tr>
          </thead>
          <tbody>
            {player.seasonTotals
              .filter(team =>
                team.gameTypeId === 2
                && (team.leagueAbbrev === 'NHL')
                // || (team.leagueAbbrev === 'AHL')
                // || (team.leagueAbbrev === 'KHL')
              )
              .map((team, index) => (
                <tr key={index}>
                  <td>{team.season.toString().substring(2, 4)}-{team.season.toString().substring(6, 8)}</td>
                  <td>{team.leagueAbbrev}</td>
                  <td>{team.teamName.default}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.goals}</td>
                  <td>{team.assists}</td>
                  <td>{team.points}</td>
                  <td>{team.plusMinus}</td>
                  <td>{team.pim}</td>
                  <td>{team.shots}</td>
                  <td>{team.shootingPctg ? (team.shootingPctg * 100).toFixed(1) : ''}</td>
                  <td>{team.powerPlayGoals}</td>
                  <td>{team.powerPlayPoints != undefined ? team.powerPlayPoints - team.powerPlayGoals : ''}</td>
                  <td>{team.shorthandedGoals}</td>
                  <td>{team.shorthandedPoints != undefined ? team.shorthandedPoints - team.shorthandedGoals : ''}</td>
                  <td>{team.gameWinningGoals}</td>
                  <td>{team.avgToi}</td>
                  <td>{team.avgToi ? calculatePROD(team.goals, team.avgToi, team.gamesPlayed) : ''}</td>
                  <td>{team.avgToi ? calculatePROD(team.assists, team.avgToi, team.gamesPlayed) : ''}</td>
                  <td>{team.avgToi ? calculatePROD(team.points, team.avgToi, team.gamesPlayed) : ''}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div style={{margin: '0px 50px'}}>
      <PercentChanceToScore playerId={playerId} season={'20232024'} gameType={2}/>
      </div>


      <div style={{height: '200px'}}/>
    </>
  )
}