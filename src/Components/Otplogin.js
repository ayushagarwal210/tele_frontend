import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
export default function Otplogin() {
  const [phoneNumber, setPhoneNumber] = useState();
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
      .get(
        `http://localhost:9090/login/verifyPatientPhoneNumber/${phoneNumber}`
      )
      .then((response) => {
        setIsValidNumber(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [phoneNumber]);
  const [isValidNumber, setIsValidNumber] = useState(false);
  async function sendOTP(e) {
    e.preventDefault();
    console.log(isValidNumber);

    if (!isValidNumber) {
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
  const [validOTP, setValidOTP] = useState(false);
  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(result);
        setValidOTP(true);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <Form className="m-2">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />

              <Button
                variant="success"
                type="submit"
                size="sm"
                onClick={sendOTP}
              >
                Send OTP
              </Button>
            </Form.Group>
          </Row>
        </Form>
        <Form>
          <Form.Group className="m-2" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button
              variant="success"
              type="submit"
              size="sm"
              onClick={verifyOTP}
            >
              Verify OTP
            </Button>
          </Form.Group>
        </Form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
