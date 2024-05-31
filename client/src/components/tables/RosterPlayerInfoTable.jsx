// Utils
import { determineHeight, determineAge } from '../../utils/math'

// React Boostrap
import Table from 'react-bootstrap/Table'


export default function RosterPlayerInfoTable({playerList}){


  return (
    <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>#</th>
          <th>POS</th>
          <th>Age</th>
          <th>Ht</th>
          <th>Wt</th>
          <th>Shot</th>
          <th>Birth Place</th>
          <th>Birthdate</th>
        </tr>
      </thead>
      <tbody>
        {playerList.map((player, index) => (
          <tr key={player.id} style={{ verticalAlign: 'middle' }}>
            <td><img src={player.headshot} style={{ width: '32px', borderRadius: '50%' }} /></td>
            <td><a href={`/player/${player.id}`}>{player.firstName.default} {player.lastName.default}</a></td>
            <td>{player.sweaterNumber}</td>
            <td>{player.positionCode}</td>
            <td>{determineAge(player.birthDate)}</td>
            <td>{determineHeight(player.heightInInches)}</td>
            <td>{player.weightInPounds}</td>
            <td>{player.shootsCatches}</td>
            <td>{player.birthCity.default}, {player.birthCountry}</td>
            <td>{player.birthDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}