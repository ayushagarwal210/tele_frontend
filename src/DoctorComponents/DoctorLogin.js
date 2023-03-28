import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { async } from "@firebase/util";
import axios from "axios";
import { useNavigate } from "react-router";
export default function DoctorLogin() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [otp, setOtp] = useState();
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:9090/login/verifyDoctorPhoneNumber/${phoneNumber}`)
      .then((response) => {
        console.log(phoneNumber)
        setIsValidNumber(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [phoneNumber]);

  async function sendOTP(e) {
    e.preventDefault();
    console.log(isValidNumber);

    if (isValidNumber) {
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const navigate = useNavigate();
  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        navigate(`/doctor`);
        console.log(result);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card container m-2 p-2">
        <Form onSubmit={sendOTP}>
          <Row className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <Form.Text className="text-muted">
                We'll never share your phone number with anyone else.
              </Form.Text>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Send OTP
          </Button>
        </Form>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={verifyOTP}>
            Verify OTP
          </Button>
        </Form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
