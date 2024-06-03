// React
import { useState, useEffect } from "react"

// Components
import {Loading} from '../components'
import TeamNavTable from '../components/tables/TeamNavTable'

// Utils
import { getTeams } from "../utils/api/nhle.custom.routes"


export default function TeamsPage() {

  const [teams, setTeams] = useState()

  // Fetch roster data
  useEffect(() => {
    getTeams().then(data => setTeams(data))
  }, [])

  if(!teams) return <Loading />

  return (
    <div className='page-container'>
      <div
        className='page-sub-container'
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '25px'}}
      >
        <h2 style={{ alignSelf: 'left' }}>NHL Teams</h2>
        <TeamNavTable teams={teams} />
      </div>
    </div>
  )
}