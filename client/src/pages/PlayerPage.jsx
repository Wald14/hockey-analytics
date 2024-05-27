import { useState, useEffect } from 'react'

export default function PlayerPage() {

  const [player, setPlayer] = useState()

  async function getPlayer() {
    try {
      const query = await fetch('')
      const result = await query.json()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPlayer()
  }, [])

  return (
    <>
      <h2>Player Page</h2>
    </>
  )
}