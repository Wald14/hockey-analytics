// React & React-Router-Dom
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Components -> Charts
import SkaterStatsBySeasonTable from '../components/tables/SkaterStatsBySeasonTable'

// Utils
import { getPlayerInfo } from '../utils/api/nhle.routes'
import {
  determineHeight,
  determineAge,
  getOrdinalSuffix,
  getSeasonYearRange
} from '../utils/math'

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
  if (!player) return <></>

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '1248px'}}>
        <div style={{ display: 'flex', margin: '20px 50px' }}>
          <div style={{ width: '100%' }}>
            <img
              src={player.heroImage}
              style={{
                height: "400px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top"
              }}
            />
          </div>
        </div >
        <div style={{ display: 'flex', margin: '20px 50px' }}>

          <div style={{ display: 'flex', width: 'max-content', textWrap: 'nowrap', color: '#212529', padding: '22px 12px 22px 22px' }}>
            <img
              src={player.headshot}
              alt={`Headshot of ${player.firstName.default} ${player.lastName.default}`}
              style={{
                backgroundColor: '#D4D6D7',
                border: 'solid 2px #B0B2B4',
                borderRadius: '50%',
                height: '160px',
                width: '160px',
              }}
            />
            <div style={{ paddingLeft: '32px' }}>
              <h2>{player.firstName.default} {player.lastName.default}</h2>
              <div style={{ display: 'flex' }}>
                <img
                  src={player.teamLogo}
                  alt={`${player.fullTeamName.default} Logo`}
                  style={{
                    width: '48px',
                    height: '32px',
                    paddingRight: '8px',
                    border: ''
                  }}
                />
                <p
                  style={{
                    fontSize: '18px',
                    margin: '0px',
                    width: '56px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: 'solid 1px #E0E0E0'
                  }}
                >
                  #{player.sweaterNumber}
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    margin: '0px',
                    width: '56px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: 'solid 1px #E0E0E0'
                  }}
                >
                  {player.position}
                </p>
              </div>
              <div style={{ fontSize: '14px' }}>
                <p style={{ margin: '0px' }}>
                  <span style={{fontWeight: 'bold'}}>HT/WT: </span>
                  {determineHeight(player.heightInInches)}, {player.weightInPounds} lbs
                </p>
                <p style={{ margin: '0px' }}>
                  <span style={{fontWeight: 'bold'}}>Born: </span>
                  {player.birthDate}, ({determineAge(player.birthDate)})
                </p>
                <p style={{ margin: '0px' }}>
                  <span style={{fontWeight: 'bold'}}>Birthplace: </span>
                  {player.birthCity.default}, {player.birthCountry}
                </p>
                <p style={{ margin: '0px' }}>
                  <span style={{fontWeight: 'bold'}}>Draft: </span>
                  {player.draftDetails.year}, {player.draftDetails.teamAbbrev} ({player.draftDetails.overallPick} overall), {getOrdinalSuffix(player.draftDetails.round)} round, {getOrdinalSuffix(player.draftDetails.pickInRound)} pick
                </p>
              </div>
            </div>
          </div>


          <div style={{ width: '100%', padding: '22px 22px 22px 0px' }}>
            <div style={{
              color: '#212529',
              backgroundColor: '#D1ECF9',
              border: 'solid 10px #D1ECF9',
              borderRadius: '10px',
              display: 'flex',
              fontSize: '14px',
              height: '78px',
              margin: '10px',
              width: '100%',
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '120px',
              }}>
                <p style={{ margin: '0px', fontSize: '16px', fontWeight: 'bold' }}>
                  {getSeasonYearRange(player.featuredStats.season)} Season
                </p>
              </div>
              <table
                style={{
                  marginLeft: '20px',
                  width: 'calc(100% - 140px)',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                <thead>
                  <tr>
                    <th>GP</th>
                    <th>G</th>
                    <th>A</th>
                    <th>PTS</th>
                    <th>+/-</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.subSeason.gamesPlayed}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.subSeason.goals}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.subSeason.assists}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.subSeason.points}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.subSeason.plusMinus}</td>
                  </tr>
                </tbody>
              </table>

            </div>

            <div style={{
              color: '#212529',
              backgroundColor: '#D1ECF9',
              border: 'solid 10px #D1ECF9',
              borderRadius: '10px',
              display: 'flex',
              fontSize: '14px',
              height: '78px',
              margin: '10px',
              width: '100%',
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '120px',
              }}>
                <p style={{ margin: '0px', fontSize: '16px', fontWeight: 'bold' }}>
                  Career
                </p>
              </div>
              <table
                style={{
                  marginLeft: '20px',
                  width: 'calc(100% - 140px)',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                <thead>
                  <tr>
                    <th>GP</th>
                    <th>G</th>
                    <th>A</th>
                    <th>PTS</th>
                    <th>+/-</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.career.gamesPlayed}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.career.goals}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.career.assists}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.career.points}</td>
                    <td style={{ fontSize: '24px' }}>{player.featuredStats.regularSeason.career.plusMinus}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: "column", margin: '0px 50px' }}>
          <SkaterStatsBySeasonTable player={player} />
        </div>

        <div style={{ height: '200px' }} />
      </div>        
    </div>
  )
}