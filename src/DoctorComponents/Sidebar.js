import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
function Sidebar() {
  const patient = [
    {
      id: 1,
      name: "patient1",
    },
    {
      id: 2,
      name: "patient2",
    },
    {
      id: 3,
      name: "patient3",
    },
    {
      id: 4,
      name: "patient4",
    },
  ];
  const handleSelectChange = (event) => {
    setSelectedPatient(event.target.value);
    console.log(selectedPatient);
  };
  const [selectedPatient, setSelectedPatient] = useState();

  return (
    <Menu>
      {patient.map((p) => {
        return (
          <button className="menu-item" onClick={handleSelectChange}>
            {p.name}
          </button>
        );
      })}
    </Menu>
  );
}
export default Sidebar;
