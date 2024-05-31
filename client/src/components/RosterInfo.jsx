// React & React-Router-Dom
import { useState, useEffect } from 'react'

// Components
import RosterPlayerInfoTable from './tables/RosterPlayerInfoTable'

//Utils
import { getRoster } from '../utils/api/nhle.routes'


export default function RosterInfo({teamAbbrev}) {

  const [roster, setRoster] = useState()

  // Fetch roster data
  useEffect(() => {
    getRoster(teamAbbrev).then(data => {
      setRoster(data)
      console.log(data)
    })
  }, [teamAbbrev])

  return (
      <div>
        {roster?.forwards &&
          <>
            <h2>Forwards</h2>
            <RosterPlayerInfoTable playerList={roster.forwards} />
          </>
        }
        {roster?.defensemen &&
          <>
            <h2>Defensemen</h2>
            <RosterPlayerInfoTable playerList={roster.defensemen} />
          </>
        }
        {roster?.goalies &&
          <>
            <h2>Goalies</h2>
            <RosterPlayerInfoTable playerList={roster.goalies} />
          </>
        }
      </div>
  )
}