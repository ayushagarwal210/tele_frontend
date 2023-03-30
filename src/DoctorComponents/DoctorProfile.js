import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import "./styleRegistration.css";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";

function DoctorProfile() {
  const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/doctor");
  };

  return (
    <>
      <DoctorNavbar />
      <div className="container card p-4 mt-2">
        <h2 style={{ justifyItems: "center" }} className="text-center">
          Doctor Profile
        </h2>
        <br />
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Select
                // defaultValue={title}
                value={doctorDetails.title}
                name="title"
                disabled
              >
                <option>Title</option>
                <option>Mr.</option>
                <option>Miss.</option>
                <option>Mrs.</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Control
                type="text"
                value={doctorDetails.firstName}
                placeholder="First Name"
                name="firstname"
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Control
                type="text"
                value={doctorDetails.lastName}
                placeholder="Last Name"
                name="lastname"
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Select
                defaultValue="Gender"
                value={doctorDetails.gender}
                name="gender"
                disabled
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="date"
                name="date"
                placeholder="DOB"
                dateFormat="YYYY/MM/DD"
                value={doctorDetails.dob}
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                type="email"
                value={doctorDetails.email}
                placeholder="Enter email"
                name="email"
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <PhoneInput
                placeholder="Enter phone number"
                value={doctorDetails.phoneNumber}
                name="phoneno"
                disabled
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Control
                type="text"
                value={doctorDetails.addr}
                placeholder=" Address"
                name="address"
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control
                type="text"
                value={doctorDetails.city}
                placeholder=" City"
                name="city"
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPincode">
              <Form.Control
                type="text"
                value={doctorDetails.pincode}
                placeholder=" Pincode"
                name="pincode"
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlID="formGridButtons">
              <Button
                variant="primary"
                type="submit"
                className="sendbutton register text-center"
                onClick={handleSubmit}
              >
                Back to Home Page
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default DoctorProfile;
