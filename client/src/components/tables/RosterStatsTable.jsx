// Utils
import { determineHeight, determineAge } from '../../utils/math'

// React Bootstrap
import Table from 'react-bootstrap/Table'

// CSS
import './roster-tables.css'


export default function RosterStatsTable({ skaters, goalies }) {


  return (
    <>
      {skaters &&
        <div className='roster-table-container'>
          <Table responsive hover size="sm" className='roster-table'>
            <thead>
              <tr>
                <th className='rt-bg-c-sticky-one'></th>
                <th className='rt-bg-c-sticky-two'>Name</th>
                <th className='rt-bg-c'>POS</th>
                <th className='rt-bg-c'>GP</th>
                <th className='rt-bg-c'>G</th>
                <th className='rt-bg-c'>A</th>
                <th className='rt-bg-c'>Pts</th>
                <th className='rt-bg-c'>+/-</th>
                <th className='rt-bg-c'>PIM</th>
                <th className='rt-bg-c'>PPG</th>
                <th className='rt-bg-c'>SHG</th>
                <th className='rt-bg-c'>GWG</th>
                <th className='rt-bg-c'>OTG</th>
              </tr>
            </thead>
            <tbody>
              {skaters.map((player) => (
                <tr key={player.playerId} style={{ verticalAlign: 'middle' }}>
                  <td className='rt-bg-c-sticky-one'>
                    <img
                      src={player.headshot}
                      className='roster-table-headshot'
                      alt={`${player.firstName.default} ${player.lastName.default}`}
                    />
                  </td>
                  <td className='roster-table-player-name  rt-bg-c-sticky-two'>
                    <a href={`/player/${player.playerId}`}>
                      {player.firstName.default} {player.lastName.default}
                    </a>
                  </td>
                  <td className='rt-bg-c'>{player.positionCode}</td>
                  <td className='rt-bg-c'>{player.gamesPlayed}</td>
                  <td className='rt-bg-c'>{player.goals}</td>
                  <td className='rt-bg-c'>{player.assists}</td>
                  <td className='rt-bg-c'>{player.points}</td>
                  <td className='rt-bg-c'>{player.plusMinus}</td>
                  <td className='rt-bg-c'>{player.penaltyMinutes}</td>
                  <td className='rt-bg-c'>{player.powerPlayGoals}</td>
                  <td className='rt-bg-c'>{player.shorthandedGoals}</td>
                  <td className='rt-bg-c'>{player.gameWinningGoals}</td>
                  <td className='rt-bg-c'>{player.overtimeGoals}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      }
      {goalies &&
        <div className='roster-table-container'>
          <Table responsive hover size="sm" className='roster-table'>
            <thead>
              <tr>
                <th className='rt-bg-c-sticky-one'></th>
                <th className='rt-bg-c-sticky-two'>Name</th>
                <th className='rt-bg-c'>GP</th>
                <th className='rt-bg-c'>GS</th>
                <th className='rt-bg-c'>W</th>
                <th className='rt-bg-c'>L</th>
                <th className='rt-bg-c'>T</th>
                <th className='rt-bg-c'>OT</th>
                <th className='rt-bg-c'>GAA</th>
                <th className='rt-bg-c'>SV%</th>
                <th className='rt-bg-c'>SA</th>
                <th className='rt-bg-c'>SV</th>
                <th className='rt-bg-c'>GA</th>
              </tr>
            </thead>
            <tbody>
              {goalies.map((player) => (
                <tr key={player.playerId} style={{ verticalAlign: 'middle' }}>
                  <td className='rt-bg-c-sticky-one'>
                    <img
                      src={player.headshot}
                      className='roster-table-headshot'
                      alt={`${player.firstName.default} ${player.lastName.default}`}
                    />
                  </td>
                  <td className='roster-table-player-name  rt-bg-c-sticky-two'>
                    <a href={`/player/${player.playerId}`}>
                      {player.firstName.default} {player.lastName.default}
                    </a>
                  </td>
                  <td className='rt-bg-c'>{player.gamesPlayed}</td>
                  <td className='rt-bg-c'>{player.gamesStarted}</td>
                  <td className='rt-bg-c'>{player.wins}</td>
                  <td className='rt-bg-c'>{player.losses}</td>
                  <td className='rt-bg-c'>{player.ties}</td>
                  <td className='rt-bg-c'>{player.overtimeLosses}</td>
                  <td className='rt-bg-c'>{player.goalsAgainstAverage.toFixed(2)}</td>
                  <td className='rt-bg-c'>{player.savePercentage.toFixed(3)}</td>
                  <td className='rt-bg-c'>{player.shotsAgainst}</td>
                  <td className='rt-bg-c'>{player.saves}</td>
                  <td className='rt-bg-c'>{player.goalsAgainst}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      }
    </>
  )

}