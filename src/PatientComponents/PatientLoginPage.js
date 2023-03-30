import React from "react";
import "./PatientStyle.css";
import PateintLogin from "./PateintLogin";
import NavbarHome from "../Components/NavbarHome";

const PatientLoginPage = () => {
  return (
    // <div className='pt-header-section'>
    //     <div className='img'>
    //          <div className='pt-login-heading'>
    //             Patient Login
    //         </div>
    //     </div>

    // </div>
    <>
      {/* <NavbarHome /> */}
      <div className="header-section">
        <div className="bg">
          <div className="img" />
          <div className="right-container">
            <div className="h">Patient Login</div>
            <div>
              <PateintLogin className="login-container" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientLoginPage;
