// React & React-Router-Dom
import { useState } from 'react';
import { useParams } from 'react-router-dom'

// Components
import { RosterInfo, RosterStats } from '../components'

// Bootstrap
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function TeamRosterPage() {

  const { teamAbbrev } = useParams()

  const [selectedTab, setSelectedTab] = useState("roster")
  const handleChange = (e) => { 
    setSelectedTab(e.target.name) 
    console.log(e.target.name)
  }

  return (
    <div className='page-container'>


      <div style={{ marginLeft: 'auto', marginRight: 'auto'}}>
        <Row
          style={{
            borderBottom: "solid #0A74DA 1px",
            paddingBottom: "2px",
            marginTop: "16px"
          }}
        >
          {/* <Col 
            xs={4} md={2} lg={1}
          > */}
            <a
            name="roster" 
            className={`headerBtnA ${selectedTab === "roster" ? 'selected' : ''}`} onClick={handleChange} >
              Roster
            </a>
          {/* </Col>
          <Col 
            xs={4} md={2} lg={1}
          > */}
            <a 
            name="stats" 
            className={`headerBtnA ${selectedTab === "stats" ? 'selected' : ''}`} onClick={handleChange} >
              Stats
              </a>
              {/* </Col> */}
        </Row>
      </div>


      {/* <div className='page-sub-container'> */}
      {selectedTab === "roster" &&
        <RosterInfo teamAbbrev={teamAbbrev} />
      }
      {selectedTab === "stats" &&
        <RosterStats teamAbbrev={teamAbbrev} />
      }
      {/* </div> */}
    </div>
  )
}