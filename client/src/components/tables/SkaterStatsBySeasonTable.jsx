// React & React-Router-Dom
import { useState } from 'react'

// Components
import { Loading } from '../';

// Utils
import { calculatePROD } from '../../utils/math'

// React Bootstrap
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';

// CSS
import './skater-stats-by-season.css'

export default function SkaterStatsBySeasonTable({ player }) {

  const defaultToggle = player.seasonTotals.find(season => season.leagueAbbrev === "NHL") ? true : false

  const [displayNHLOnly, setDisplayNHLOnly] = useState(defaultToggle)

  // Loading
  if (!player) return <></>

  return (
    <div className='skater-stats-season-table-main-container'>
      <div className='skater-stats-season-table-title-container'>
        <h3 className='skater-stats-season-table-title'>Regular Season</h3>
        <Form className='skater-stats-season-table-form'>
          <Form.Switch
            checked={displayNHLOnly}
            className='skater-stats-season-table-switch'
            label="NHL Only"
            onChange={() => setDisplayNHLOnly(prevState => !prevState)}
          />
        </Form>
      </div>
      <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
        <caption className='skater-stats-season-table-glossary-item-caption'>
          <div className='skater-stats-season-table-glossary-item-container'>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>+/-: </span>Plus Minus Rating
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>PIM: </span>Penalty Minutes
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>S: </span>Shots on Goal
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>A: </span>Assists
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>PPA: </span>Power Play Assists
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>SHA: </span>Short Handed Assists
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>G: </span>Goals
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>PPG: </span>Power Play Goal
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>SHG: </span>Short Handed Goals
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>GP: </span>Games Played
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>PROD: </span>: Average ice time per point recorded
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>SCPT: </span>Scoring Percentage (Goals/Shots)
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>GWG: </span>Game Winning Goals
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>PTS: </span>Points (Goals + Assists)
            </p>
            <p className='skater-stats-season-table-glossary-item'>
              <span className='skater-stats-season-bold'>TOI/G: </span>Time On Ice per Game
            </p>
            {/* <p className='skater-stats-season-table-glossary-item'>
            <span className='skater-stats-season-bold'>PROD-g: </span>Average ice time per goal recorded
            </p>
            <p className='skater-stats-season-table-glossary-item'>
            <span className='skater-stats-season-bold'>PROD-a: </span>Average ice time per assist recorded
            </p> */}

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
            <th>S</th>
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
                <td className='skater-stats-season-nowrap'>{team.teamName.default}</td>
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
    </div>

  )
}