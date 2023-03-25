import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton, FormGroup } from "react-bootstrap";
import NavbarHome from "../Components/NavbarHome";
import { Navigate, useNavigate } from "react-router-dom";

function PatientAppointment() {
  const dept = [
    {
      id: "1",
      name: "department1",
    },
    {
      id: "2",
      name: "department2",
    },
    {
      id: 3,
      name: "department3",
    },
  ];
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSelectChange = (eventKey) => {
    setSelectedDepartment(eventKey);
  };
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/patient/waitingArea`);
    console.log(file);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append("pdf", file);
  // };
  return (
    <div>
      <NavbarHome />
      <Form className="container m-3 card p-3" onSubmit={submitHandler}>
        <h1 className="text-center">Appointment</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <textarea
            value={description}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Describe your problem here..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <FormGroup className="mb-3">
          <div class="form-group">
            <Form.Label>Upload previous health record</Form.Label>
            <input
              type="file"
              class="form-control"
              onChange={handleFileChange}
            />
          </div>
          {/* <Button variant="secondary" onClick={handleUpload}>
            Upload Pdf
          </Button> */}
        </FormGroup>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select a department:</Form.Label>
          <DropdownButton
            id="department-select"
            title={selectedDepartment || "Select department"}
            onSelect={handleSelectChange}
            variant="secondary"
          >
            {dept.map((d) => {
              return <Dropdown.Item eventKey={d.name}>{d.name}</Dropdown.Item>;
            })}
          </DropdownButton>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PatientAppointment;
