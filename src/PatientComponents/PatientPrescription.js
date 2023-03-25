import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Link from "@mui/material/Link";
import { saveAs } from "file-saver";
import NavbarHome from "../Components/NavbarHome";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function PatientPrescription() {
  const { uid } = useParams();
  const [prescription, setPrescription] = useState([""]);
  const [pdfUrl, setPdfUrl] = useState("");
  const patientId = localStorage.getItem("patientDetail");

  console.log(patientId);

  async function fetchData() {
    await axios
      .get(`http://localhost:9090/prescription/getPrescriptions/${patientId}`)
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const downloadPDF = async (id, date) => {
    axios({
      url: `http://localhost:9090/pdf/getPdf/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${date}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    downloadPDF();
  }, []);
  return (
    <>
      <NavbarHome />
      <a href="/">
        <Button variant="primary" type="submit">
          Logout
        </Button>
      </a>
      <Table striped bordered hover className="mt-2 container text-center">
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
                <td>{p.date}</td>
                <td>{p.observation}</td>
                <td>{p.medicine}</td>
                <td>{p.remark}</td>
                <td>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={downloadPDF.bind(this, p.prescriptionId, p.date)}
                  >
                    Download PDF
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </Table>
    </>
  );
}
