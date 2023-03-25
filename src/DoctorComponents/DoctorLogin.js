import React, { createContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "./style.css";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import NavbarHome from "../Components/NavbarHome";
import DoctorNavbar from "./DoctorNavbar";

const DoctorLogin = () => {
  const baseURL = "http://localhost:9090/doctor/login";
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var okstatus = 0;

  const handleChange_email = (event) => {
    setEmail(event.target.value);
  };

  const handleChange_password = (event) => {
    setPassword(event.target.value);
  };

  // const handleSubmit = async (id) => {
  //   // event.preventDefault(); //important to not reload page
  //   try {
  //     const response = await axios.post(baseURL, {
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       // handler(response.data);
  //       // window.sessionStorage.setItem("user", JSON.stringify(response.data));
  //       // window.location.reload(true);
  //       navigate('/doctor', {replace:true});
  //     })
  //   } catch (error) {
  //     console.log(error);
  //     alert("Invalid Credentials");
  //   }

  //   // window.location.replace(`/doctor`);
  // };
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
        // window.localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("doctorDetail",JSON.stringify(response.data));
        // window.location.reload(true);
        navigate('/doctor/prescription', {replace:true});
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid Credentials");
      });
    // window.location.replace(`/pateint`);
    // localStorage.setItem("doctorDetail",JSON.stringify(response));
  };


  return (
    <>
      <NavbarHome />
      <div className="container card p-4 mt-2">
        <h2 className="text-center">Doctor Login</h2>

        <Form title="Doctor Login">
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
};

export default DoctorLogin;
