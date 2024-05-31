// React & React-Router-Dom
import { useParams } from 'react-router-dom'

// Components
import RosterInfo from '../components/RosterInfo'


export default function TeamPage() {

  const { teamAbbrev } = useParams()

  return (
    <div
      style={{
        margin: '20px 50px 50px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <RosterInfo teamAbbrev={teamAbbrev} />
    </div>
  )
}