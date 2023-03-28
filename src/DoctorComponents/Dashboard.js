import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import Table from "react-bootstrap/Table";
import './DoctorConsultationPageStyle.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [dailyLog, setDailyLog] = useState();
  const { uid } = useParams();
  const [info, setInfo] = useState();
  const generatePrescription = (id) => {
    window.location.replace(`/doctor/prescription/${id}`);
  };

  async function fetchDailyLog() {
    await axios
      .get(`dailylogapi`)
      .then((response) => {
        setDailyLog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchData() {
    await axios
      .get(`http://localhost:9090/doctor/getdoctorByEmail/${uid}`)
      .then((response) => {
        setInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData();
    fetchDailyLog();
  }, []);
  // console.log(info);
  return (
    <>
      <DoctorNavbar />
      <div className="doctor-dashboard">
        <div className="container text-center m-3">
          <h2>Hello</h2>
          {/* <h3>
          Dr. {info.firstName} {info.lastName}
        </h3> */}
          {/* <Button onClick={generatePrescription(this, info.doctorId)}>
          Prescription
        </Button> */}
          <h1>Dashboard</h1>
        </div>
        <div className="dr-daily-log">
          <h1>Daily-log</h1>
          <Table striped bordered hover className="mt-2 container text-center">
            <thead>
              <tr>
                <th>Pt. Id</th>
                <th>Observation</th>
              </tr>
            </thead>
            {/* <tbody>
              {dailyLog ? (
                dailyLog.map((p) => (
                  <tr>
                    <td>{p.dailyLogDate}</td>
                    <td>{p.departmentName}</td>
                    <td>{p.doctorName}</td>
                    <td>{p.observation}</td>
                  </tr>
                ))
              ) : (
                <h1>...</h1>
              )}
            </tbody> */}
            </Table>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
