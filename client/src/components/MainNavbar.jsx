import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './MainNavbar.css'

export default function MainNavbar() {
  return (
    <Navbar
      bg="dark"
      className='navbar'
      data-bs-theme="dark"
      expand="sm"
    >
      <Container
        className='navbar-sub-container'
      >
        <Navbar.Brand href="/" className='navbar-brand'>
          <img
            src="/src/assets/img/logos/blue-line-metrics-logo.png"
            width="40"
            height="40"
            alt="Blue line metrics logo"
          />
          Blue Line Metrics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/standings">Standings</Nav.Link>
            <Nav.Link href="/teams">Teams</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}




