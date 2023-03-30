import React from "react";
import Sidebar from "./Sidebar";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function DoctorNavbar() {
  const logout = () => {
    localStorage.removeItem("doctorDetails");
    window.location.href = "/doctor/logins";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <div className="App" id="outer-container">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
        <div id="page-wrap" />
      </div>
      <Container>
        <Navbar.Brand href="/doctor">TeleConsultation</Navbar.Brand>
        <Nav className="me-2">
          <Nav.Link href="/doctor">Home</Nav.Link>
          <Nav.Link href="/doctor/prescription">Prescription</Nav.Link>
          {/* <Nav.Link href="/patient/waitingArea">OPD</Nav.Link> */}
          <NavDropdown
            alignRight
            title={<span>{<FontAwesomeIcon icon={faUser} />} Hello</span>}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/doctor/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DoctorNavbar;
