// React & React-Router-Dom
import { useState } from 'react'

// Utils
import { calculatePROD } from '../../utils/math'

// React Bootstrap
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';



export default function SkaterStatsBySeasonTable({player}){

  const [displayNHLOnly, setDisplayNHLOnly] = useState(true)

  // Loading
  if (!player) return <p>Loading...</p>


  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h3>Regular Season</h3>
        <Form style={{ alignSelf: 'center' }}>
          <Form.Switch
            id="display-nhl-only-switch"
            label="Display NHL Seasons Only"
            checked={displayNHLOnly}
            onChange={() => setDisplayNHLOnly(prevState => !prevState)}
          />
        </Form>
      </div>
      <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
        <caption>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>GP: Games Played</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>G: Goals</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>A: Assists</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PTS: Points (Goals + Assists)</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>SOG: Shots on Goal</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>SCPT: Scoring Percentage (Goals/Shots)</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PPG: Power Play Goals</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PPG: Power Play Assists</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>SHG: Short Handed Goals</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>SHA: Short Handed Assists</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>GWG: Game Winning Goals</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>TOI/G: Time On Ice per Game</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PROD-g: Average ice time per goal recorded</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PROD-a: Average ice time per assist recorded</p>
            <p style={{ margin: '0px', flex: '1 0 33%', maxWidth: '33%' }}>PROD-p: Average ice time per point recorded</p>
          </div>
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
            {/* <th style={{ fontSize: '8px' }}>PROD-g</th>
            <th style={{ fontSize: '8px' }}>PROD-a</th> */}
            <th style={{ fontSize: '12px' }}>PROD</th>
          </tr>
        </thead>
        <tbody>
          {player.seasonTotals
            .filter(team => {
              if (displayNHLOnly) {
                return team.gameTypeId === 2 && (team.leagueAbbrev === 'NHL')
              } else {
                return team.gameTypeId === 2
                // && (team.leagueAbbrev === 'NHL')
                // || (team.leagueAbbrev === 'AHL')
                // || (team.leagueAbbrev === 'KHL')
              }
            }
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
                {/* <td>{team.avgToi ? calculatePROD(team.goals, team.avgToi, team.gamesPlayed) : ''}</td>
                <td>{team.avgToi ? calculatePROD(team.assists, team.avgToi, team.gamesPlayed) : ''}</td> */}
                <td>{team.avgToi ? calculatePROD(team.points, team.avgToi, team.gamesPlayed) : ''}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>

  )
}