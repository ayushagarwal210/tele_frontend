import React from "react";
import NavbarHome from "../Components/NavbarHome";
import { useNavigate } from "react-router-dom";
import { useCallback , useState} from "react";
import {
  Button,
  Container,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useEffect } from "react";
import './PatientStyle.css'


function PatientWaitingArea() {
  
  const appointmentId = localStorage.getItem('patientAppointmentId')
  console.log('appointment',appointmentId)
  const [count, setCount] = useState(0)
  const [roomCode, setRoomCode] = useState("")
  const navigate = useNavigate()

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${roomCode}`);
  }, [navigate, roomCode])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:9090/appointment/waitingPatients/${appointmentId}`
      );
      const json = await response.json();
      setCount(json)
      console.log(json)
      console.log('count',count)
    };
    fetchData();
  }, [appointmentId,count]);

  return (
    <div>
      <NavbarHome />
      <h1>This is the waiting area...</h1>
      <Container className="main-div">
        <div className="waiting-number">
        {count? 
         <h1>{count}</h1>
         :<h1>0</h1>
        } 
        </div>
        <div className="vdo">
          <input type="text"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            required
            placeholder='Enter Room Code' />
          <Button variant="secondary" onClick={handleJoinRoom}>
            Call Doctor
          </Button>
        </div>
      </Container>

    </div>
  );
}

export default PatientWaitingArea;
