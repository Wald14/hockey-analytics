// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import MainNavbar from './components/MainNavbar'
import StandingsTable from './components/StandingsTable'

// CSS and Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

function App() {

  return (
    <>
      <MainNavbar/>
      <StandingsTable />
    </>
  )
}

export default App
