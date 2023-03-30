import React from "react";
import Button from "react-bootstrap/Button";
import NavbarHome from "./NavbarHome";

function Home() {
  return (
    <>
      <div className="m-4 text-center container ">
        <Button
          variant="outline-success"
          href="/doctor/logins"
          className="m-2 btn-lg"
        >
          Doctor Login
        </Button>
        {/* <Button
          variant="outline-warning"
          href="/patient/registration"
          className="m-2 btn-lg"
        >
          Patient Registration
        </Button> */}
        <Button
          variant="outline-info"
          href="/patient/logins"
          className="m-2 btn-lg"
        >
          Patient Login
        </Button>
      </div>
    </>
  );
}
export default Home;
