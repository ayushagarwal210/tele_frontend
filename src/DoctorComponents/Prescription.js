import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
// import DoctorNavbar from "./DoctorNavbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Prescription() {
  const navigate = useNavigate();
  const [followUp, setFollowUp] = useState(false);
  const [inputFeilds, setInputFeilds] = useState([
    { medicine: "", dosage: "" },
  ]);
  const handleFormChange = (index, event) => {
    let data = [...inputFeilds];
    data[index][event.target.name] = event.target.value;
    setInputFeilds(data);
  };
  const addFields = (event) => {
    event.preventDefault();
    let newfield = { medicine: "", dosage: "" };
    setInputFeilds([...inputFeilds, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFeilds];
    data.splice(index, 1);
    setInputFeilds(data);
  };
  const [value, setValue] = useState(null);

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };

  const patientId = localStorage.getItem("patientId");
  // console.log(patientId)
  const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
  // console.log("doctor id", doctorDetails.doctorId);
  const [observation, setObservation] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicine, setMedicine] = useState("");
  const [patientDetail, setPatientDetail] = useState([
    {
      patientId: patientId,
      firstName: "",
      lastName: "",
    },
  ]);

  // console.log(medicine)

  const handleChangeObservation = (event) => {
    // console.log("observation event",event.target.value)
    setObservation(event.target.value);
    // console.log("observation",observation)
  };
  const handleChangeAdvice = (event) => {
    // console.log("advice event",event.target.value)
    setAdvice(event.target.value);
    // console.log("advice",advice)
  };
  const handleChangeMedicine = (event) => {
    // console.log(event.target.value)
    setMedicine(event.target.value);
    // console.log("medicine",medicine)
  };

  const { uid } = useParams();
  const [count, setCount] = useState(0);

  const fetchPatientDetail = async () => {
    await axios
      .get(`http://localhost:9090/patient/getPatientById/${patientId}`)
      .then((response) => {
        console.log("patientDetail", response.data);
        setPatientDetail(response.data);
        console.log("patients", patientDetail);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  async function fetchData() {
    const data = {
      consultationDate: new Date(),
      observation: observation,
      medicine: medicine,
      remark: advice,
      doctorName: "Aakanksha",
      doctorId: doctorDetails.doctorId,
      patientName: patientDetail.firstName,
      patientId: patientId,
    };

    // console.log(data);
    await axios
      .post("http://localhost:9090/prescription/addPrescription", data)
      .then((response) => {
        console.log("inside post prescription api");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      consultationDate: new Date(),
      observation: observation,
      medicine: medicine,
      remark: advice,
      doctorName: "Aakanksha",
      doctorId: doctorDetails.doctorId,
      patientName: patientDetail.firstName,
      patientId: patientId,
    };

    console.log("form updated data", data);
    await axios
      .post("http://localhost:9090/prescription/addPrescription", data)
      .then((response) => {
        console.log("inside post prescription api");
        console.log(response.data);
        navigate(`/doctor`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleFollowUp = () => {
    setFollowUp(true);
    setValue(new Date());
  };
  useEffect(() => {
    fetchPatientDetail();
  }, []);

  return (
    <>
      {/* <DoctorNavbar /> */}
      <div className="container">
        <Form
          onSubmit={(event) => {
            submitHandler(event);
          }}
        >
          {/* This code will be used later */}
          {/* ********************************** */}
          {/* {inputFeilds.map((input,index)=>{
            return(
              <div key={index}>
              <Form.Group className="mt-2 mb-3 input-group" controlId="formBasicEmail">
            <Form.Label>Medicine -</Form.Label>
            <Form.Control  name="medicine" value={input.medicine}  onChange={ (event)=> handleFormChange(index,event)}/>
            <span className="input-group-addon m-2"></span>
            <Form.Label>Dosage -</Form.Label>
            <Form.Control  name="dosage" value={input.dosage} onChange={(event)=>  handleFormChange(index,event)} />
          <button onClick={() => removeFields(index)}>Remove</button>
          </Form.Group>
          
          </div>
            )
          })}
          <button onClick={addFields}>Add More..</button> */}
          {/* **************************************** */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Patient ID</Form.Label>
            <Form.Control name="patientId" defaultValue={patientId} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              name="patientName"
              value={patientDetail.firstName}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Medicine and Dosage</Form.Label>
            <Form.Control
              name="medicine"
              value={medicine}
              onChange={handleChangeMedicine}
            />
            {/* <input 
              type="text"
              onChange={(e) => setMedicine(e.target.value)}
              value={medicine}
            /> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Observation</Form.Label>
            <Form.Control
              name="observation"
              value={observation}
              onChange={handleChangeObservation}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              name="advice"
              value={advice}
              onChange={handleChangeAdvice}
            />
          </Form.Group>

          {followUp ? (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Follow up"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChangeTime}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Form.Group>
          ) : (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Follow Up</Form.Label> */}
              <Button variant="secondary" onClick={handleFollowUp}>
                Add Follow-Up
              </Button>
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Prescription;
