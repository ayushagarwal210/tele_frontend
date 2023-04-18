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
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCalendarCheck,
  faCalendarDay,
  faCalendarDays,
  faDeleteLeft,
  faMinusCircle,
  faRemove,
  faRemoveFormat,
} from "@fortawesome/free-solid-svg-icons";

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
  console.log(inputFeilds);
  const [value, setValue] = useState("");

  const handleChangeTime = (newValue) => {
    console.log(newValue.$d);
    setValue(newValue.$d);
    console.log(value);
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
  const [allMedicineData, setAllMedicineData] = useState([]);

  const getAllMedicine = async () => {
    await axios
      .get("https://rxnav.nlm.nih.gov/REST/displaynames.json")
      .then((response) => {
        setAllMedicineData(response.data.displayTermsList.term);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(allMedicineData);
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
  const medicineString = inputFeilds
    .map((item) => {
      return `Medicine: ${item.medicine} --> Dosage: ${item.dosage}`;
    })
    .join("\n");

  // console.log(medicineString);

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      consultationDate: new Date(),
      observation: observation,
      medicine: medicineString,
      remark: advice,
      doctorId: doctorDetails.doctorId,
      patientName: patientDetail.firstName,
      patientId: patientId,
      followUpDate: value,
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
    getAllMedicine();
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

          {inputFeilds.map((input, index) => {
            return (
              <div key={index}>
                <Form.Group
                  className="card p-2 mt-2 mb-3 "
                  controlId="formBasicEmail"
                >
                  <Form.Label>Dosage -</Form.Label>
                  <Form.Control
                    name="dosage"
                    value={input.dosage}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <Form.Label>Medicine -</Form.Label>
                  <Form.Control
                    name="medicine"
                    value={input.medicine}
                    onChange={(event) => handleFormChange(index, event)}
                  />

                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => removeFields(index)}
                  >
                    {<FontAwesomeIcon icon={faMinusCircle} />} Remove
                  </Button>
                </Form.Group>
                <Dropdown
                  style={{
                    position: "absolute",
                    backgroundColor: "white", // Set background color to white
                    borderRadius: "4px", // Set border radius to create rounded corners
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)", // Add a box shadow for depth
                    padding: "3px", // Add padding to create spacing between items
                    zIndex: "9999",
                    maxWidth: "35%",
                    maxHeight: "35%",
                    overflow: "auto",
                  }}
                >
                  {allMedicineData
                    .filter((item) => {
                      const searchItem = input.medicine.toLowerCase();
                      const medicine = item.toLowerCase();
                      return (
                        medicine.indexOf(searchItem) > -1 &&
                        searchItem != medicine &&
                        searchItem.length >= 1
                      );
                    })
                    .slice(0, 10)
                    .map((item) => (
                      <Dropdown.Item
                        key={item}
                        onClick={() => {
                          const updatedInputFields = [...inputFeilds];
                          updatedInputFields[index].medicine = item;
                          setInputFeilds(updatedInputFields);
                        }}
                        style={{
                          // Add additional styling for each item
                          padding: "5px 10px", // Add padding to create spacing within each item
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                </Dropdown>
              </div>
            );
          })}
          <Button onClick={addFields} className="mt-2">
            {<FontAwesomeIcon icon={faAdd} />} Add More..
          </Button>
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
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Follow up"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={(e) => {
                    setValue(e.$d);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Form.Group>
          ) : (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Follow Up</Form.Label> */}
              <Button variant="secondary" onClick={handleFollowUp}>
                {<FontAwesomeIcon icon={faCalendarDay} />} Add Follow-Up
              </Button>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="mb-2">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Prescription;
