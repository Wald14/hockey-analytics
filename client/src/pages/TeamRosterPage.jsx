// React & React-Router-Dom
import { useParams } from 'react-router-dom'

// Components
import {RosterInfo, RosterStats} from '../components'


export default function TeamRosterPage() {

  const { teamAbbrev } = useParams()

  return (
    <div className='page-container'>
      {/* <div className='page-sub-container'> */}
        <RosterStats teamAbbrev={teamAbbrev} />
        <RosterInfo teamAbbrev={teamAbbrev} />
      {/* </div> */}
    </div>
  )
}