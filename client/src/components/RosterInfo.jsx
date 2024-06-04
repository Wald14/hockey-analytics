// React & React-Router-Dom
import { useState, useEffect } from 'react'

// Components
import RosterPlayerInfoTable from './tables/RosterPlayerInfoTable'
import { Loading } from './'

//Utils
import { getCurrentRoster } from '../utils/api/nhle.routes'

//CSS
import './roster-info.css'


export default function RosterInfo({ teamAbbrev }) {

  const [roster, setRoster] = useState()

  // Fetch roster data
  useEffect(() => {
    getCurrentRoster(teamAbbrev).then(data => {
      setRoster(data)
      // console.log(data)
    })
  }, [teamAbbrev])

  if(!roster) return <Loading/>

  return (
    <div className='roster-info-tables-container'>
      <h2 className='roster-info-header'>Roster</h2>
      {roster?.forwards &&
        <>
          <p className='roster-info-table-header'>Forwards</p>
          <RosterPlayerInfoTable playerList={roster.forwards} />
        </>
      }
      {roster?.defensemen &&
        <>
          <p className='roster-info-table-header'>Defensemen</p>
          <RosterPlayerInfoTable playerList={roster.defensemen} />
        </>
      }
      {roster?.goalies &&
        <>
          <p className='roster-info-table-header'>Goalies</p>
          <RosterPlayerInfoTable playerList={roster.goalies} />
        </>
      }
    </div>
  )
}