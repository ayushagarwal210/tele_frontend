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


function PatientWaitingArea() {

  const [roomCode, setRoomCode] = useState("")
  const navigate = useNavigate()

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${roomCode}`);
  }, [navigate, roomCode])

  return (
    <div>
      <NavbarHome />
      <h1>This is the waiting area...</h1>
      <Container>
        <div>
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
