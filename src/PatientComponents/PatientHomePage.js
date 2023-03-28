import { Menu } from "@mui/material";
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

export default function PatientHomePage() {
  const [department, setDepartment] = useState();
  async function fetchData() {
    await axios
      .get(`http://localhost:9090/department/getDepartment`)
      .then((response) => {
        setDepartment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function postData() {
    await axios
      .post("http://localhost:9090/appointment/requestAppointment", {
        appointmentTimestamp: new Date(),
        patientId: localStorage.getItem("patientDetail"),
        departmentName: selectedDepartment,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    fetchData();
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
        patientId: localStorage.getItem("patientDetail"),
        departmentName: selectedDepartment,
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/patient/waitingArea`);
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
