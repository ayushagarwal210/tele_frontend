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
import Otplogin from "./Components/Otplogin";
import Footer from "./Components/Footer";
import DoctorConsultationPage from "./DoctorComponents/DoctorConsultationPage";
// import VideoCallPage from "./Components/VideoCallPage";
import PatientLoginPage from "./PatientComponents/PatientLoginPage";
import DoctorLoginPage from "./DoctorComponents/DoctorLoginPage";
import DoctorVideoCallPage from "./DoctorComponents/DoctorVideoCallPage"
import PatientVideoCallPage from "./PatientComponents/PatientVideoCallPage"
import { UserProvider } from "./providers/Provider";

function App() {
  return (
    <div>
      {/* Git check */}
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient" element={<PatientHomePage />} />
          <Route path="/patient/patientvdocall" element={<PatientVideoCallPage />} />
          <Route
            path="/patient/prescription"
            element={<PatientPrescription />}
          />
          <Route path="/patient/login" element={<PateintLogin />} />
          <Route path="/patient/logins" element={<PatientLoginPage />} />    {/*sahi krna h isse abhi*/}
          {/* <Route path="/patient/appointment" element={<PatientAppointment />} /> */}
          <Route path="/patient/waitingArea" element={<PatientWaitingArea />} />
          <Route
            path="/patient/registration"
            element={<PatientRegistration />}
          />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/logins" element={<DoctorLoginPage />} />
          <Route path="/doctor/doctorvdocall" element={<DoctorVideoCallPage />} />
          <Route path="/doctor" element={<Dashboard />} />
          <Route path="/doctor/prescription" element={<Prescription />} />
          {/* <Route path="/room/:roomId" element={<VideoCallPage />} /> */}
          <Route path="/doctor/consultationpage" element={<DoctorConsultationPage />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
