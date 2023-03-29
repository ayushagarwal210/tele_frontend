import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom'
import  axios  from "axios";

function Sidebar() {
  const [count,setCount]=useState(0);
  const doctorDetails = JSON.parse(localStorage.getItem('doctorDetails'))
  const [queuedPt, setQueuedPt] = useState([])
  var appointmentId;
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

  const deletePt = async() => {
    console.log("inside deletePt",appointmentId);
    await axios.delete(`http://localhost:9090/appointment/deleteAppointment/${appointmentId}`)
    .then((response) => {console.log('Delete successful')
     setCount(count+1)
     navigate(`/doctor/consultationpage`)
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        console.error('There was an error!', error);
    })
  }

  useEffect(() => {
    fetchQueuedPt()
  }, [count]);

  // const deletePatientId =  async(event) => {
  //   console.log("event:---",event);
  //   // fetchQueuedPt();
  //   await deletePt(event.appointmentId)
  //   navigate(`/doctor/consultationpage`)
  // };
 

  return (
    <Menu>
      {queuedPt.length? ( 
        queuedPt.map((p, index) => {
          return (
            <div key={index}>
              <button className="menu-item" onClick={()=>{
                appointmentId = p.appointmentId
                localStorage.setItem('patientId',p.patientId)
                console.log("appointmentId: ", appointmentId)
                deletePt()
              }}>
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
