// React & React-Router-Dom
import { useParams } from 'react-router-dom'

// Components
import RosterInfo from '../components/RosterInfo'


export default function TeamPage() {

  const { teamAbbrev } = useParams()

  return (
    <div className='page-container'>
      {/* <div className='page-sub-container'> */}
        <RosterInfo teamAbbrev={teamAbbrev} />
      {/* </div> */}
    </div>
  )
}