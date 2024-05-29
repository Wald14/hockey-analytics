// React & React-Router-Dom
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Utils -> Api routes
import { getRoster } from '../utils/api/nhle.routes'

// Utils -> Math
import { determineHeight, determineAge } from '../utils/math'

// React Boostrap
import Table from 'react-bootstrap/Table'


export default function RoasterTable() {

  const {teamAbbrev} = useParams()

  const [roster, setRoster] = useState()

  // Fetch roster data
  useEffect(() => {
    getRoster(teamAbbrev).then(data => setRoster(data))
  }, [teamAbbrev])

  // Loading
  if (!roster) return <p>Loading...</p>

  return (
    <div>
      <h2>{teamAbbrev} Roster</h2>
      {roster.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Forwards</h3>
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
              {roster.forwards.map((player, index) => (
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

          <h3>Defensemen</h3>
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
              {roster.defensemen.map((player, index) => (
                <tr key={player.id}>
                  <td><img src={player.headshot} style={{ width: '32px', borderRadius: '50%' }} /></td>
                  <td><a href={`/player/${player.id}`}>{player.firstName.default} {player.lastName.default}</a></td>
                  <td>{player.sweaterNumber}</td>
                  <td>{player.positionCode}</td>
                  <td>{determineAge(player.birthDate)}</td>
                  <td>{determineAge(player.birthDate)}</td>
                  <td>{player.weightInPounds}</td>
                  <td>{player.shootsCatches}</td>
                  <td>{player.birthCity.default}, {player.birthCountry}</td>
                  <td>{player.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h3>Goalies</h3>
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
              {roster.goalies.map((player, index) => (
                <tr key={player.id}>
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

        </>
      )}
    </div>
  )
}

