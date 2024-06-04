// Utils
import { determineHeight, determineAge } from '../../utils/math'

// React Bootstrap
import Table from 'react-bootstrap/Table'

// CSS
import './roster-tables.css'


export default function RosterPlayerInfoTable({ playerList }) {
  return (
      <div className='roster-table-container'>
        <Table responsive hover size="sm" className='roster-table'>
          <thead>
            <tr>
              <th className='rt-bg-c-sticky-one'></th>
              <th className='rt-bg-c-sticky-two'>Name</th>
              <th className='rt-bg-c'>#</th>
              <th className='rt-bg-c'>POS</th>
              <th className='rt-bg-c'>Age</th>
              <th className='rt-bg-c'>Ht</th>
              <th className='rt-bg-c'>Wt</th>
              <th className='rt-bg-c'>Shot</th>
              <th className='rt-bg-c'>Birthdate</th>
              <th className='rt-bg-c'>Birth Place</th>
            </tr>
          </thead>
          <tbody>
            {playerList.map((player) => (
              <tr key={player.id} style={{ verticalAlign: 'middle' }}>
                <td className='rt-bg-c-sticky-one'>
                  <img
                    src={player.headshot}
                    className='roster-table-headshot'
                    alt={`${player.firstName.default} ${player.lastName.default}`}
                  />
                </td>
                <td className='roster-table-player-name  rt-bg-c-sticky-two'>
                  <a href={`/player/${player.id}`}>
                    {player.firstName.default} {player.lastName.default}
                  </a>
                </td>
                <td className='rt-bg-c'>{player.sweaterNumber}</td>
                <td className='rt-bg-c'>{player.positionCode}</td>
                <td className='rt-bg-c'>{determineAge(player.birthDate)}</td>
                <td className='rt-bg-c'>{determineHeight(player.heightInInches)}</td>
                <td className='rt-bg-c'>{player.weightInPounds}</td>
                <td className='rt-bg-c'>{player.shootsCatches}</td>
                <td className='rt-bg-c no-text-wrap' >{player.birthDate}</td>
                <td className='rt-bg-c '>{player.birthCity.default}, {player.birthCountry}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
}