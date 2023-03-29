import { Menu } from "@mui/material";
import Table from "react-bootstrap/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import NavbarHome from "../Components/NavbarHome";
import { useNavigate } from "react-router-dom";
import './PatientStyle.css'

export default function PatientHomePage() {
  const [department, setDepartment] = useState();
  const [followUp, setFollowUp] = useState();
  const patientDetails = JSON.parse(localStorage.getItem('patientDetails'))

  async function fetchFollowUp() {
    await axios
      .get(`http://localhost:9090/prescription/getFollowUp/${patientDetails.patientId}`)
      .then((response) => {
        setFollowUp(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  async function fetchData() {
    await axios
      .get(`http://localhost:9090/department/getDepartment`)
      .then((response) => {
        setDepartment(response.data);
        console.log(response.data);
        console.log(patientDetails.patientId)
        // fetchFollowUp();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function postData() {
    await axios
      .post("http://localhost:9090/appointment/requestAppointment", {
        appointmentTimestamp: new Date(),
        patientId: localStorage.getItem("patientDetails"),
        departmentName: selectedDepartment,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    fetchData();
    fetchFollowUp();
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:9090/appointment/requestAppointment", {
        appointmentTimestamp: new Date(),
        patientId:patientDetails.patientId,
        departmentName: selectedDepartment,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('appointmentId',response.data)
        navigate(`/patient/waitingArea`);
        console.log(response.data)
      });
    // handle form submission logic here
    handleClose();
  }

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSelectChange = (eventKey) => {
    setSelectedDepartment(eventKey);
  };
  return (
    <>
      <NavbarHome />
      <Container>
      <div className="patient-main-homepage">
        <div className="border p-3 m-2">
          <h2>Patient DashBoard</h2>
          <p>Welcome to E-Arrogya</p>
          <Button variant="secondary" className="mr-3 m-2" onClick={handleShow}>
            Apply for consultation
          </Button>
          <Button variant="secondary" href="/patient/prescription">
            View-History
          </Button>
        </div>
        <div className="follow-up">
            <h5>Follow-Up</h5>
            <Table striped bordered hover className="mt-2 container text-center">
            <thead>
              <tr>
                <th>Follow-up date</th>
                <th>Department</th>
                <th>DoctorName</th>
                <th>Observation</th>
              </tr>
            </thead>
            <tbody>
              {followUp? (
                followUp.map((p) => (
                  <tr>
                    <td>{p.followUpDate}</td>
                    <td>{p.departmentName}</td>
                    <td>{p.doctorName}</td>
                    <td>{p.observation}</td>
                  </tr>
                ))
              ) : (
                <h1>...</h1>
              )}
            </tbody>
            </Table>
          </div>
          </div>
      </Container>
      <Modal show={show} onHide={handleClose} className="text-center">
        <Modal.Header closeButton>
          <Modal.Title>Apply for consultation:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Select a department:</Form.Label>
              <DropdownButton
                id="department-select"
                title={selectedDepartment || "Select department"}
                onSelect={handleSelectChange}
                variant="secondary"
              >
                {department ? (
                  department.map((d) => {
                    return (
                      <Dropdown.Item eventKey={d.departmentName}>
                        <strong>{d.departmentName}</strong>
                        <p>({d.description})</p>
                      </Dropdown.Item>
                    );
                  })
                ) : (
                  <h1>Loading...</h1>
                )}
              </DropdownButton>
            </Form.Group>

            <Button variant="success" type="submit">
              Apply
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
