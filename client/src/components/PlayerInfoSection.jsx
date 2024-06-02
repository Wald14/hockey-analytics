import {
  determineHeight,
  determineAge,
  getOrdinalSuffix,
  getSeasonYearRange
} from '../utils/math'

import './player-info-section.css'

export default function PlayerInfoSection({ player }) {



  return (

    <div className='player-info-main-component' >

      <div className='player-info-left-container'>
        <div className='player-info-headshot-container'>
          <img
            src={player.headshot}
            alt={`Headshot of ${player.firstName.default} ${player.lastName.default}`}
            className='player-info-headshot'
          />
        </div>

        <div className='player-info-details-container'>
          <p className='player-info-details-container-header'>{player.firstName.default} {player.lastName.default}</p>

          <div className='player-info-details-sub-container'>
            <img
              src={player.teamLogo}
              alt={`${player.fullTeamName.default} Logo`}
              className='player-info-details-sub-container-logo'
            />

            <p className='player-info-details-sub-container-text'>
              #{player.sweaterNumber}
            </p>
            <p className='player-info-details-sub-container-text'>
              {player.position}
            </p>
          </div>

          <div>
            <p className='player-info-details-sub-container-text-2'>
              <span className='player-info-bold'>HT/WT: </span>
              {determineHeight(player.heightInInches)}, {player.weightInPounds} lbs
            </p>
            <p className='player-info-details-sub-container-text-2'>
              <span className='player-info-bold'>Born: </span>
              {player.birthDate}, ({determineAge(player.birthDate)})
            </p>
            <p className='player-info-details-sub-container-text-2'>
              <span className='player-info-bold'>Birthplace: </span>
              {player.birthCity.default}, {player.birthCountry}
            </p>
            <p className='player-info-details-sub-container-text-2'>
              <span className='player-info-bold'>Draft: </span>
              {player.draftDetails &&
                <span>
                  {player.draftDetails.year}, {player.draftDetails.teamAbbrev} ({player.draftDetails.overallPick} overall), {getOrdinalSuffix(player.draftDetails.round)} round, {getOrdinalSuffix(player.draftDetails.pickInRound)} pick
                </span>
              }
              {!player.draftDetails &&
                <span>
                  Undrafted
                </span>
              }
            </p>
          </div>
        </div>
      </div>

      {player.featuredStats &&
        <div className='player-info-right-container'>
          <div className='player-info-summary-container'>
            <div className='player-info-summary-title-container'>
              <p className='player-info-summary-title'>
                {getSeasonYearRange(player.featuredStats.season)} Season
              </p>
            </div>
            <table className='player-info-summary-table'>
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
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.subSeason.gamesPlayed}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.subSeason.goals}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.subSeason.assists}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.subSeason.points}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.subSeason.plusMinus}
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <div className='player-info-summary-container'>
            <div className='player-info-summary-title-container'>
              <p className='player-info-summary-title'>
                Career
              </p>
            </div>
            <table className='player-info-summary-table'>
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
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.career.gamesPlayed}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.career.goals}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.career.assists}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.career.points}
                  </td>
                  <td className='player-info-summary-td'>
                    {player.featuredStats.regularSeason.career.plusMinus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}