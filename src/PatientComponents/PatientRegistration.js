import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import "./styleRegistration.css";
import axios from "axios";
import NavbarHome from "../Components/NavbarHome";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
import Otplogin from "../Components/Otplogin";
import { useLocation, useParams } from "react-router-dom";
// import DatePicker from 'react-datepicker';
// import Swal from 'sweetalert2'

const PatientRegistration = ({ phoneNo }) => {
  console.log(phoneNo);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  // const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  // const [state,setState] = useState("")
  const [pinCode, setPinCode] = useState("");
  const [password, setPassword] = useState("");

  const handleChange_title = (event) => {
    setTitle(event.target.value);
  };

  const handleChange_fname = (event) => {
    setFirstName(event.target.value);
  };

  const handleChange_lname = (event) => {
    setLastName(event.target.value);
  };

  const handleChange_gender = (event) => {
    setGender(event.target.value);
  };

  const handleChange_date = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const handleChange_email = (event) => {
    setEmail(event.target.value);
  };

  const handleChange_address = (event) => {
    setAddress(event.target.value);
  };

  const handleChange_city = (event) => {
    setCity(event.target.value);
  };

  const handleChange_pincode = (event) => {
    setPinCode(event.target.value);
  };

  const handleChange_password = (event) => {
    setPassword(event.target.value);
  };

  async function fetchData() {
    await axios
      .post("http://localhost:9090/patient/register", {
        title: title,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phoneNo: phoneNo,
        email: email,
        dob: date,
        addr: address,
        city: city,
        password: password,
        pincode: pinCode,
      })
      .then((response) => {
        console.log(response.data);
      });
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchData();
    navigate(`/`);
  };

  return (
    <>
      {/* <NavbarHome /> */}
      <div className="container card p-4 mt-2">
        <h2 style={{ justifyItems: "center" }} className="text-center">
          Patient Registration
        </h2>
        <br />
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Select
                defaultValue={title}
                value={title}
                onChange={handleChange_title}
                name="title"
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
                value={firstName}
                onChange={handleChange_fname}
                placeholder="First Name"
                name="firstname"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Control
                type="text"
                value={lastName}
                onChange={handleChange_lname}
                placeholder="Last Name"
                name="lastname"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Select
                defaultValue="Gender"
                value={gender}
                onChange={handleChange_gender}
                name="gender"
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
                value={date}
                onChange={handleChange_date}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                type="email"
                value={email}
                onChange={handleChange_email}
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNo}
                // onChange={setPhoneNo}
                name="phoneno"
                disabled
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Control
                type="text"
                value={address}
                onChange={handleChange_address}
                placeholder=" Address"
                name="address"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control
                type="text"
                value={city}
                onChange={handleChange_city}
                placeholder=" City"
                name="city"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPincode">
              <Form.Control
                type="text"
                value={pinCode}
                onChange={handleChange_pincode}
                placeholder=" Pincode"
                name="pincode"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                type="password"
                onChange={handleChange_password}
                placeholder="Password"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlID="formGridButtons">
              <Button
                variant="primary"
                type="submit"
                className="sendbutton register"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default PatientRegistration;
