import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MainNavbar() {
  return (
    <Navbar 
    bg="dark" 
    data-bs-theme="dark" 
    style={{
      borderBottom: 'solid 6px #A9DFF7'
      }}>
      <Container style={{maxWidth: "1160px"}}>
        <Navbar.Brand href="/">Blue Line Metrics</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/standings">Standings</Nav.Link>
          <Nav.Link href="/teams">Teams</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}




