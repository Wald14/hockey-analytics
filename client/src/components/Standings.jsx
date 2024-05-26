import {useState, useEffect} from 'react';

export default function Standings() {
  const [standings, setStandings] = useState([])

  async function getStandings(){
    try {
      const query = await fetch('/api/nhle/standings')
      const result = await query.json();
      console.log(result)
    } catch (err) {
      console.log('Failed to fetch standings:', err)
    }
  }


  //Run after component mounts
  useEffect(()=>{
    getStandings()
  },[])

  return (
    <></>
  )
}