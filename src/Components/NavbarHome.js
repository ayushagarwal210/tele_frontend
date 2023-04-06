import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  faEdit,
  faHospital,
  faHospitalUser,
  faInfoCircle,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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
            <Nav.Link href="/patient">
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link href="#about">
              {<FontAwesomeIcon icon={faInfoCircle} />} About
            </Nav.Link>
            <Nav.Link href="/patient/waitingArea">
              {<FontAwesomeIcon icon={faHospitalUser} />} OPD
            </Nav.Link>
            <NavDropdown
              alignRight
              title={<span>{<FontAwesomeIcon icon={faUser} />} Hello</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/patient/update-profile">
                {<FontAwesomeIcon icon={faEdit} />} Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                {<FontAwesomeIcon icon={faSignOut} />} Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarHome;
