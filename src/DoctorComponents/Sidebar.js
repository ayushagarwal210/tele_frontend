import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom'
import  axios  from "axios";

function Sidebar() {
  const [count,setCount]=useState(0);
  const doctorDetails = JSON.parse(localStorage.getItem('doctorDetails'))
  const [queuedPt, setQueuedPt] = useState([])
  const navigate = useNavigate()

  async function fetchQueuedPt() {
    await axios
      .get(`http://localhost:9090/appointment/getAllAppointments/${doctorDetails.departmentName}`)
      .then((response) => {
        setQueuedPt(response.data);
        console.log(queuedPt);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // async function deletePt(id) {
  //   console.log("id",id);
  //   await axios.delete(`http://localhost:9090/appointment/deleteAppointment/${id}`)
  //   .then((response) => {console.log('Delete successful')
  //   //  setCount(count+1)
  //   })
  //   .catch(error => {
  //       console.log(`Error: ${error.message}`);
  //       console.error('There was an error!', error);
  //   })
  // }

  useEffect(() => {
    fetchQueuedPt()
  }, []);

  const deletePatientId =  () => {
    // setSelectedPatient(event.target.value);
    // console.log("event:---",event);

    // ;
    // fetchQueuedPt();
    navigate(`/doctor/consultationpage`)
    // console.log(selectedPatient);
  };
  // const [selectedPatient, setSelectedPatient] = useState();

  return (
    <Menu>
      {/* {patient.map((p) => {
        return (
          <button className="menu-item" onClick={handleSelectChange}>
            {p.name}
          </button>
        );
      })} */}
      {queuedPt.length>0 ? ( 
        queuedPt.map((p) => {
          return (
            <div>
              <button className="menu-item" onClick={deletePatientId}>
              PatientId : {p.patientId}
            </button>
            </div>
          )
        })
      ) : (
        <h1>...</h1>
      )}
    </Menu>
  );
}
export default Sidebar;
