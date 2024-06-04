// React
import { useState, useEffect } from "react"

// Components
import RosterStatsTable from "./tables/RosterStatsTable"

// Utils
import { getRosterStats, getTeamSeasons } from "../utils/api/nhle.routes"
import { getSeasonYearRange } from "../utils/math"

// Bootstrap
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// CSS
import './roster-stats.css'


export default function RosterStats({ teamAbbrev }) {
  const [statsRoster, setStatsRoster] = useState()
  const [seasonList, setSeasonList] = useState([])
  const [selectedSeason, setSelectedSeason] = useState()
  const [selectedGameType, setSelectedGameType] = useState()
  const [selectedSeasonObj, setSelectedSeasonObj] = useState()

  // Handle season change
  const handleSeasonChange = (e) => {
    const newSeason = Number(e.target.value)
    setSelectedSeason(newSeason)
  }

  // Fetch team seasons and set default season and game type
  useEffect(() => {
    getTeamSeasons(teamAbbrev)
      .then(data => {
        setSeasonList(data)
        console.log('Setting Season List To:', data)

        if (data[0]?.season && data[0]?.gameTypes[0]) {
          setSelectedSeason(data[0].season)
          setSelectedGameType(data[0].gameTypes[0])
          console.log('Setting Selected Season To:', data[0].season)
          console.log('Setting Selected Game Type To:', data[0].gameTypes[0])
        }
      })
  }, [teamAbbrev])

  // Update selectedSeasonObj and selectedGameType when selectedSeason changes
  useEffect(() => {
    if (seasonList.length > 0) {
      const newSeasonObj = seasonList.find(season => season.season === selectedSeason)
      setSelectedSeasonObj(newSeasonObj)
      if (newSeasonObj && newSeasonObj.gameTypes.length > 0) {
        setSelectedGameType(newSeasonObj.gameTypes[0])
      } else {
        setSelectedGameType(undefined)
      }
    }
  }, [selectedSeason, seasonList])

  // Fetch roster stats when selectedSeason and selectedGameType change
  useEffect(() => {
    if (selectedSeason && selectedGameType) {
      getRosterStats(teamAbbrev, selectedSeason, selectedGameType)
        .then(data => {
          setStatsRoster(data)
          console.log('Setting Roster-Stats To:', data)
        })
    }
  }, [teamAbbrev, selectedSeason, selectedGameType])

  return (
    <>
      <div className='roster-info-tables-container'>
        <h2 className='roster-info-header'>Statistics</h2>
        {seasonList.length > 0 &&
          <Form.Group className="roster-stats-form" >
            <Row>
              <Col>
                <Form.Select 
                className="roster-stats-form-select"
                value={selectedSeason} 
                onChange={handleSeasonChange}
                >
                  {seasonList.map((item) => (
                    <option
                      className="roster-stats-form-options"
                      key={item.season}
                      value={item.season}
                    >
                      {getSeasonYearRange(item.season)}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                {selectedSeasonObj &&
                  <Form.Select 
                  className="roster-stats-form-select"
                  value={selectedGameType} 
                  onChange={(e) => setSelectedGameType(Number(e.target.value))}
                  >
                    {selectedSeasonObj.gameTypes.map((gameType) => (
                      <option
                        key={gameType}
                        value={gameType}
                      >
                        {gameType === 2 ? 'Regular Season' : 'Stanley Cup Playoffs'}
                      </option>
                    ))}
                  </Form.Select>
                }
              </Col>
            </Row>
          </Form.Group>
        }
        {statsRoster?.skaters &&
          <>
            <p className='roster-info-table-header'>Skaters</p>
            <RosterStatsTable skaters={statsRoster.skaters} />
          </>
        }
        {statsRoster?.goalies &&
          <>
            <p className='roster-info-table-header'>Goalies</p>
            <RosterStatsTable goalies={statsRoster.goalies} />
          </>
        }
      </div>
    </>
  )
}
