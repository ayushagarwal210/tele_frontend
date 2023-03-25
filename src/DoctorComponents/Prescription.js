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
import DoctorNavbar from "./DoctorNavbar";
import { useParams } from "react-router-dom";

function Prescription() {
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
  const [value, setValue] = React.useState(dayjs(new Date()));

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
  
  const getLocalData = () => {
    const lists = localStorage.getItem("doctorDetail")
    if(lists){
      return JSON.parse(lists)
    }
    else{
      return []
    }
}

  const [doctorDetail , setDoctorDetail] = useState(getLocalData());
  const [observation, setObservation] = useState();
  const [advice, setAdvice] = useState();
  const [medicine, setMedicine] = useState();
  const [patientId, setPatientId] = useState();
  const [patientName, setPatientName] = useState();
  const handleChangeObservation = (event) => {
    setObservation(event);
  };
  const handleChangeAdvice = (event) => {
    setAdvice(event);
  };
  const handleChangeMedicine = (event) => {
    setMedicine(event);
  };
  const handleChangePatientId = (event) => {
    setPatientId(event);
  };
  const handleChangePatientName = (event) => {
    setPatientName(event);
  };
  const { uid } = useParams();

  async function fetchData() {
    await axios
      .post("http://localhost:9090/prescription/addPrescription", {
        date: new Date(),
        observation: observation,
        medicine: medicine,
        remark: advice,
        doctorName: "Aakanksha",
        doctorId: doctorDetail.doctorId,
        patientName: patientName,
        patientId: patientId,
      })
      .then((response) => {
        console.log(response.data);
      });
  }
  const submitHandler = async (event) => {
    // event.preventDefault();
    console.log(doctorDetail.doctorId);
    await fetchData();
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <DoctorNavbar />
      <div className="container">
        <Form onSubmit={submitHandler}>
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
            <Form.Control
              name="patientId"
              value={patientId}
              onChange={(e) => handleChangePatientId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              name="patientName"
              value={patientName}
              onChange={(e) => handleChangePatientName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Medicine and Dosage</Form.Label>
            <Form.Control
              name="medicine"
              value={medicine}
              onChange={(e) => handleChangeMedicine(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Observation</Form.Label>
            <Form.Control
              name="observation"
              value={observation}
              onChange={(e) => handleChangeObservation(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              name="advice"
              value={advice}
              onChange={(e) => handleChangeAdvice(e.target.value)}
            />
          </Form.Group>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Prescription;
