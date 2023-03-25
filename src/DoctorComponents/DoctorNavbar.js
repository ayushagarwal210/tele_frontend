import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function DoctorNavbar() {
  const doctorHome = () => {
    window.location.replace(`/doctor`);
  };
  const doctorPrescription = () => {
    window.location.replace(`/doctor/prescription`);
  };
  return (
    <Navbar bg="light" expand="lg">
      <div className="App" id="outer-container">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
        <div id="page-wrap" />
      </div>
      <Container>
        <Navbar.Brand href="/">TeleConsultation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={doctorHome}>Home</Nav.Link>
            {/* <Nav.Link href="/doctor/login">Login</Nav.Link> */}
            <Nav.Link onClick={doctorPrescription}>Prescription</Nav.Link>
            <Button variant="primary" type="submit" href="/">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DoctorNavbar;
