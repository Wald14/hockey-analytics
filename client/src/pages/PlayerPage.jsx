// React & React-Router-Dom
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Components
import PlayerInfoSection from '../components/PlayerInfoSection'
import SkaterStatsBySeasonTable from '../components/tables/SkaterStatsBySeasonTable'
import { Loading } from '../components'

// Utils
import { getPlayerInfo } from '../utils/api/nhle.routes'


export default function PlayerPage() {

  const { playerId } = useParams()

  const [player, setPlayer] = useState()

  // Run these after component mounts
  useEffect(() => {
    getPlayerInfo(playerId).then(data => {
      setPlayer(data)
      console.log('PlayerInfo', data)
    })
  }, [playerId])

  // Loading
  if (!player) return <Loading />

  return (
    <div className='page-container'>
      <div className='page-sub-container'>
        
        <img
          src={player.heroImage}
          className='page-header-img'
        />

        <PlayerInfoSection player={player} />

        <SkaterStatsBySeasonTable player={player} />

      </div>
    </div>
  )
}