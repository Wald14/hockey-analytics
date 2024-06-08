// React & React-Router-Dom
import { useState } from 'react';
import { useParams } from 'react-router-dom'

// Components
import { RosterInfo, RosterStats } from '../components'

// Bootstrap
import Row from 'react-bootstrap/Row';


export default function TeamRosterPage() {

  const { selection, teamAbbrev } = useParams()

  const preSelect = selection === 'roster' || selection === 'stats' ? selection : 'roster'

  const [selectedTab, setSelectedTab] = useState(preSelect ? preSelect : "stats")
  const handleChange = (e) => {
    setSelectedTab(e.target.name)
    console.log(e.target.name)
  }

  return (
    <div className='page-container'>


      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Row
          style={{
            borderBottom: "solid #0A74DA 1px",
            paddingBottom: "2px",
            marginTop: "16px"
          }}
        >
          <a
            name="stats"
            className={`headerBtnA ${selectedTab === "stats" ? 'selected' : ''}`} onClick={handleChange} >
            Stats
          </a>
          <a
            name="roster"
            className={`headerBtnA ${selectedTab === "roster" ? 'selected' : ''}`} onClick={handleChange} >
            Roster
          </a>
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