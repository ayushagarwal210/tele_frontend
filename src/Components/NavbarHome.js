import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function NavbarHome() {
  const logout = () => {
    localStorage.removeItem("patientDetails");
    window.location.href = "/patient/logins";
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/patient">TeleConsultation</Navbar.Brand>
          <Nav className="me-2">
            <Nav.Link href="/patient">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="/patient/waitingArea">OPD</Nav.Link>
            <NavDropdown
              alignRight
              title={<span>{<FontAwesomeIcon icon={faUser} />} Hello</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/patient/update-profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarHome;
