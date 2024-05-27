// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import MainNavbar from './components/MainNavbar'
import StandingsPage from './pages/StandingsPage'
import TeamsPage from './pages/TeamsPage';
import TeamPage from './pages/TeamPage';

// CSS and Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

function App() {

  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        {/* <Route path='/' element={} /> */}
        <Route path='/standings' element={<StandingsPage />} />
        <Route path='/teams' element={<TeamsPage />} />


        <Route path='/roster/:teamAbbrev' element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
