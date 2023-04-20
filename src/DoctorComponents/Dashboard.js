import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import Table from "react-bootstrap/Table";
import "./DoctorConsultationPageStyle.css";
import { useNavigate } from "react-router-dom";
import { dialogTitleClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Dashboard() {
  console.log("data", new Date());
  const [dailyLog, setDailyLog] = useState();
  const { uid } = useParams();
  const [info, setInfo] = useState();
  const generatePrescription = (id) => {
    window.location.replace(`/doctor/prescription/${id}`);
  };
  const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
  useEffect(() => {
    // fetchData();
    fetchDailyLog();
  }, []);
  async function fetchDailyLog() {
    await axios
      .get(
        `http://localhost:9090/doctor/doctorDailyLog/${doctorDetails.doctorId}`
      )
      .then((response) => {
        setDailyLog(response.data);
        console.log(dailyLog);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // async function fetchData() {
  //   await axios
  //     .get(`http://localhost:9090/doctor/getdoctorByEmail/${uid}`)
  //     .then((response) => {
  //       setInfo(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // console.log(info);
  const { t } = useTranslation();
  return (
    <>
      <DoctorNavbar />
      {doctorDetails ? (
        <div className="doctor-dashboard">
          <button onClick={() => i18next.changeLanguage("en")}>English</button>
          <button onClick={() => i18next.changeLanguage("hi")}>Hindi</button>
          <div className="container text-center m-3">
            <h2>
              {<FontAwesomeIcon icon={faUserDoctor} />} {t("Welcome")}
            </h2>
            {/* <Button onClick={generatePrescription(this, info.doctorId)}>
          Prescription
        </Button> */}
            <h1>
              Dr. {doctorDetails.firstName} {doctorDetails.lastName}
            </h1>
          </div>
          <div className="dr-daily-log card m-2 p-3">
            <h1 className="text-center">
              {<FontAwesomeIcon icon={faDatabase} />} Daily-log
            </h1>
            <Table
              striped
              bordered
              hover
              className="mt-2 container text-center"
            >
              <thead>
                <tr>
                  <th>Pt. Id</th>
                  <th>Observation</th>
                </tr>
              </thead>
              <tbody>
                {dailyLog ? (
                  dailyLog.map((p) => (
                    <tr>
                      <td>{p.patientId}</td>
                      <td>{p.observation}</td>
                    </tr>
                  ))
                ) : (
                  <h1>...</h1>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Dashboard;
