// React Boostrap
import { Row, Col } from 'react-bootstrap';

// CSS
import './team-nav-table.css'

export default function TeamNavTable({ teams }) {

  return (
    <Row>
      {Object.entries(teams).map(([key, value]) => {
        return (
          <Col key={key} sm={12} md={6} className='teamNavTable-conference-col'>
            <div
              style={{
                margin: '20px 10px 10px',
              }}
            >
              <div 
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
              >
                <h3
                  style={{
                    marginLeft: '8px',
                    borderBottom: 'solid 1px black',
                    textAlign: 'center',
                    minWidth: '320px'
                  }}
                >
                  {value.divisionName}
                </h3>
              </div>
              {value.teams.map((team) => {
                return (
                  <Row key={team.teamCommonName} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col sm={3} style={{ width: 'min-content' }}>
                      <img src={team.teamLogo} style={{ height: '40px', margin: '8px' }} />
                    </Col>
                    <Col style={{ paddingLeft: '0px', maxWidth: '250px' }}>
                      <p style={{ margin: '0px' }}>{team.teamName}</p>
                      <p style={{ fontSize: '12px', margin: '0px' }}>Statistics | Schedule | <a href={`/team/roster/${team.teamAbbrev}`}>Roster</a></p>
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