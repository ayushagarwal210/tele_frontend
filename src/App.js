import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./DoctorComponents/Dashboard";
import Prescription from "./DoctorComponents/Prescription";
import Home from "./Components/Home";
import PateintLogin from "./PatientComponents/PateintLogin";
import PatientRegistration from "./PatientComponents/PatientRegistration";
import DoctorLogin from "./DoctorComponents/DoctorLogin";
import PatientAppointment from "./PatientComponents/PatientAppointment";
import PatientWaitingArea from "./PatientComponents/PatientWaitingArea";
import PatientPrescription from "./PatientComponents/PatientPrescription";
import PatientHomePage from "./PatientComponents/PatientHomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient" element={<PatientHomePage />} />
          <Route
            path="/patient/prescription"
            element={<PatientPrescription />}
          />
          <Route path="/patient/login" element={<PateintLogin />} />
          {/* <Route path="/patient/appointment" element={<PatientAppointment />} /> */}
          <Route path="/patient/waitingArea" element={<PatientWaitingArea />} />
          <Route
            path="/patient/registration"
            element={<PatientRegistration />}
          />
          <Route path="/doctor" element={<Dashboard />} />
          <Route path="/doctor/prescription" element={<Prescription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
