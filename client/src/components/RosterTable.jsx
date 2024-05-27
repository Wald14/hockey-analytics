import { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table'


export default function RoasterTable() {

  const teamAbbrev = 'MIN'

  const [roster, setRoster] = useState()

  async function getRoster() {
    try {
      const query = await fetch(`/api/nhle/roster/${teamAbbrev}`)
      const result = await query.json()
      setRoster(result)

      console.log(result)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getRoster()
  }, [])


  if (!roster) return <p>Loading...</p>

  return (
    <div>
      <h2>Roster</h2>
      {roster.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Forwards</h3>
          <Table striped bordered hover size='sm' responsive style={{ textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr>
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
                <tr key={player.id}>
                  <td>{player.firstName.default} {player.lastName.default}</td>
                  <td>{player.sweaterNumber}</td>
                  <td>{player.positionCode}</td>
                  <td></td>
                  <td></td>
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
                  <td>{player.firstName.default} {player.lastName.default}</td>
                  <td>{player.sweaterNumber}</td>
                  <td>{player.positionCode}</td>
                  <td></td>
                  <td></td>
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
                  <td>{player.firstName.default} {player.lastName.default}</td>
                  <td>{player.sweaterNumber}</td>
                  <td>{player.positionCode}</td>
                  <td></td>
                  <td></td>
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

