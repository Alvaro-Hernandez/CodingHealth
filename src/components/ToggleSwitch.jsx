import React, { useState } from "react";
import "../styles/toggleSwitch.css"; // Asegúrate de vincular el archivo CSS adecuado

const ToggleSwitch = ({ isChecked, onChange }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    setChecked(!checked);
    onChange(!checked ? "Sí" : "No"); // Cambia el texto en función del estado
  };

  return (
    <label className={`switch ${checked ? "checked" : ""}`}>
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <span className="slider"></span>
      <span className={`switch-text ${checked ? "checked" : ""}`}>
        {checked ? "Sí" : "No"}
      </span>
    </label>
  );
};

export default ToggleSwitch;
