// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import * as Pages from'./pages'

// Components
import { Footer, MainNavbar } from './components';

// CSS and Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'

function App() {

  return (
    <BrowserRouter>

      <MainNavbar />

      <Routes>
        <Route path='/' element={<Pages.HomePage />} />

        <Route path='/standings' element={<Pages.StandingsPage />} />
        <Route path='/teams' element={<Pages.TeamsPage />} />

        <Route path='/player/:playerId' element={<Pages.PlayerPage />} />

        <Route path='/team/roster/:teamAbbrev' element={<Pages.TeamRosterPage />} />

        <Route path='/test' element={<Pages.TestPage/>}/>
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
