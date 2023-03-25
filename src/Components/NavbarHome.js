import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarHome() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TeleConsultation</Navbar.Brand>
          <Nav className="me-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="/patient/appointment">OPD</Nav.Link>
            <Nav.Link href="#timings">Timings</Nav.Link>
            <Nav.Link href="#contactus">ContactUs</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarHome;
