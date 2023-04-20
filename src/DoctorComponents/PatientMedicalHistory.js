import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
import { useState } from "react";
import axios from "axios";

function PatientMedicalHistory({ patientDetail }) {
  const phoneNo = patientDetail.phoneNo;
  const patientId = localStorage.getItem("patientId");
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [prescription, setPrescription] = useState([""]);
  async function fetchData() {
    await axios
      .get(`http://localhost:9090/prescription/getPrescriptions/${patientId}`)
      .then((response) => {
        setPrescription(response.data);
        console.log("prescription", prescription);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
  async function sendOTP(e) {
    e.preventDefault();
    setShowVerifyOTP(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNo, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        fetchData();
        setShowMedicalHistory(true);
        const user = result.user;
        console.log(result);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
      });
  };
  return (
    <>
      {!showMedicalHistory && (
        <div className="mb-2">
          {!showVerifyOTP && (
            <Button variant="success" type="submit" size="sm" onClick={sendOTP}>
              Send OTP To Show Medical History
            </Button>
          )}
          <p>Patient needs to allow to access the medical history</p>
          {showVerifyOTP && (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  style={{ width: "250px" }}
                  type="email"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                size="sm"
                onClick={verifyOTP}
                style={{ marginLeft: "10px" }}
              >
                Verify OTP
              </Button>
            </Form>
          )}
          <div id="recaptcha-container"></div>
        </div>
      )}
      {showMedicalHistory && (
        <div
          className="container card mt-4 d-flex mb-2"
          style={{
            overflow: "auto",
            maxHeight: "20rem",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="card-body ">
            <h3 className="card-title text-center m-2">Prescription</h3>
            <Table
              striped
              bordered
              hover
              className="mt-2 container text-center"
            >
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>OBSERVATION</th>
                  <th>MEDICINE</th>
                  <th>REMARKS</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {prescription ? (
                  prescription.map((p) => (
                    <tr>
                      <td>{p.consultationDate}</td>
                      <td>{p.observation}</td>
                      <td>{p.medicine}</td>
                      <td>{p.remark}</td>
                      {/* <td>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={downloadPDF.bind(
                          this,
                          p.prescriptionId,
                          p.date
                        )}
                      >
                        Download PDF
                      </Link>
                    </td> */}
                    </tr>
                  ))
                ) : (
                  <h1>Loading...</h1>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientMedicalHistory;
