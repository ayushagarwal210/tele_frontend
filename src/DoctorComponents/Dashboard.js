import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";

function Dashboard() {
  const { uid } = useParams();
  const [info, setInfo] = useState();
  const generatePrescription = (id) => {
    window.location.replace(`/doctor/prescription/${id}`);
  };
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
  }, []);
  // console.log(info);
  return (
    <>
      <DoctorNavbar />
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
    </>
  );
}
export default Dashboard;
