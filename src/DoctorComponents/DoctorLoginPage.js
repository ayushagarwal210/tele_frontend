import React from "react";
import "./DoctorStyle.css";
import DoctorLogin from "./DoctorLogin";
import NavbarHome from "../Components/NavbarHome";
import FooterSection from "../FooterSection/FooterSection";
import DoctorNavbar from "./DoctorNavbar";

const DoctorLoginPage = () => {
  return (
    <>
      <DoctorNavbar />
      <div className="header-section">
        <div className="dr-bg">
          <div className="dr-img" />
          <div className="right-container">
            <div className="h">Doctor Login</div>
            <div>
              <DoctorLogin className="login-container" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorLoginPage;
