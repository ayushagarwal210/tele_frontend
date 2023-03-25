import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "./style.css";
import axios from "axios";
import NavbarHome from "../Components/NavbarHome";
import { useNavigate } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";

export default function PateintLogin() {
  const baseURL = "http://localhost:9090/patient/login";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var okstatus = 0;

  const handleChange_email = (event) => {
    setEmail(event.target.value);
  };

  const handleChange_password = (event) => {
    setPassword(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //     event.preventDefault(); //important to not reload page
  // }

  const handleSubmit = async (id, event) => {
    event.preventDefault();

    await axios
      .post(baseURL, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // handler(response.data);
        // window.sessionStorage.setItem("user", JSON.stringify(response.data));
        // window.location.reload(true);
        localStorage.setItem("patientDetail", JSON.stringify(response.data));
        navigate("/patient", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid Credentials");
      });
    // window.location.replace(`/pateint`);
    // localStorage.setItem("patientemail",email);
  };

  return (
    <>
      <NavbarHome />
      <div className="container card mt-2 p-4">
        <h2 className="text-center">Patient Login</h2>

        <Form title="Patient Login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange_email}
              placeholder="Enter email"
            />
            {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange_password}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit.bind(this, email)}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
