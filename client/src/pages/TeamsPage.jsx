// Components
import TeamNavTable from '../components/tables/TeamNavTable'


export default function TeamsPage() {
  

  return (
    <div style={{ margin: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '50px' }}>
        <h2 style={{ alignSelf: 'left' }}>NHL Teams</h2>
          <TeamNavTable/>
      </div>
    </div>
  )
}