// React
import { useState, useEffect } from "react"

// Utils -> Api routes
import { getTeams } from "../utils/api/nhle.custom.routes";

// React Boostrap
import { Row, Col } from 'react-bootstrap';


export default function TeamNavTable() {

  const [teams, setTeams] = useState()

  // Fetch roster data
  useEffect(() => {
    getTeams().then(data => setTeams(data))
  }, [])

  // Loading
  if (!teams) return <p>Loading...</p>

  
  return (
    <Row style={{ maxWidth: '850px' }}>
      {Object.entries(teams).map(([key, value]) => {
        return (
          <Col key={key} sm={12} md={6}> {/* Adjust the xs, md, and lg values as needed */}
            <div style={{margin: '20px 10px 10px'}}>
              <h3 style={{marginLeft: '8px'}}>{value.divisionName}</h3>
              {value.teams.map((team) => {
                return (
                  <Row key={team.teamCommonName}>
                    <Col sm={3}>
                      <img src={team.teamLogo} style={{ height: '40px', margin: '8px' }} />
                    </Col>
                    <Col>
                      <p style={{ margin: '0px' }}>{team.teamName}</p>
                      <p style={{ fontSize: '12px', margin: '0px' }}>Statistics | Schedule | <a href={`/team/roster/${team.teamAbbrev}`}>Roster</a> | Tickets</p>
                    </Col>
                  </Row>
                )
              })}
            </div>
          </Col>
        )
      })}
    </Row>

  )
}