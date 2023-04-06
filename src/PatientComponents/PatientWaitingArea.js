import React from "react";
import NavbarHome from "../Components/NavbarHome";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useEffect } from "react";
import "./PatientStyle.css";
import { Input } from "@mui/material";
import {
  faPhone,
  faPhoneAlt,
  faPhoneFlip,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PatientWaitingArea() {
  const appointmentId = localStorage.getItem("appointmentId");
  console.log("appointment", appointmentId);
  const [count, setCount] = useState(0);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`/patient/patientvdocall`);
  }, [navigate, roomCode]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:9090/appointment/waitingPatients/${appointmentId}`
      );
      const json = await response.json();
      setCount(json);
      console.log(json);
      console.log("count", count);
    };
    fetchData();
  }, [appointmentId, count]);

  return (
    <div>
      <NavbarHome />
      <Container className="mt-3 p-3 card d-flex justify-content-center align-items-center">
        <h1 className="text-center">This is the waiting area...</h1>
        <div className="m-2 p-2 card">
          {count ? (
            <h3>Patient before you - {count}</h3>
          ) : (
            <h3>Patient before you - 0</h3>
          )}
        </div>
        <div className="vdo">
          <Button variant="success" onClick={handleJoinRoom}>
            {<FontAwesomeIcon icon={faPhone} />} Call Doctor
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default PatientWaitingArea;
