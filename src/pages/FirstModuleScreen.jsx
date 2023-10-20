import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/firstModuleStyle.css";

const FirstModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();

    const conditions = [
        "TBC",
        "Diabetes",
        "Hipertensión",
        "Preeclampsia",
        "Eclampsia",
        "Otra condición grave",
        "Anomalía congénita",
        "Cardiopatia",
        "Infertilidad",
        "Cirugia Genito-Urinaria",
        "Nefropatia",
        "Violencia",
        "Enfermedades Inmunológica",
        "VIH+"
    ];

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };

    const handleToggleChange = (value) => {
        console.log(value);
    };

    const handleInputChange = (e) => {
        if (e.target.value.length > 8) {
            e.target.value = e.target.value.slice(0, 8);
        }
    };

    return (
        <div className="firstModuleScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={handleLogout} />
                <div className="formControl">
                    <section className="sectionForm">
                        <div className="sectionInformation">
                            <h2 className="title">
                                Historia Clinica Perinatal - CLAP/SMR-OPS/OMS
                            </h2>
                            <div className="alertGroup">
                                <span className="alert"></span>
                                <h2 className="alertTitle">Amarillo es ALERTA</h2>
                            </div>
                        </div>
                        <div className="sectionData">
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Apellidos:
                                <input
                                    type="text"
                                    placeholder="Apellidos"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Domicilio:
                                <input
                                    type="text"
                                    placeholder="Domicilio"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Urbano:
                                <ToggleSwitch isChecked={false} onChange={handleToggleChange} />
                            </label>
                            <label>
                                Rural:
                                <ToggleSwitch isChecked={false} onChange={handleToggleChange} />
                            </label>
                            <label>
                                Municipio:
                                <input
                                    type="text"
                                    placeholder="Municipio"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Telefono:
                                <input
                                    type="number"
                                    onChange={handleInputChange}
                                    placeholder="Telefono"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Fecha de Nacimiento:
                                <input
                                    type="date"
                                    placeholder="Fecha Nac"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Edad:
                                <input
                                    type="number"
                                    onChange={handleInputChange}
                                    placeholder="Edad"
                                    className="customInput"
                                />
                            </label>
                            <label
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                Menor 20, Mayor 35
                                <ToggleSwitch isChecked={false} onChange={handleToggleChange} />
                            </label>
                            <label>
                                Etnia:
                                <select className="customInput">
                                    <option value="blanca">Blanca</option>
                                    <option value="indigena">Indígena</option>
                                    <option value="mestiza">Mestiza</option>
                                    <option value="negra">Negra</option>
                                    <option value="otra">Otra</option>
                                </select>
                            </label>
                            <label>
                                Alfabeta:
                                <ToggleSwitch isChecked={false} onChange={handleToggleChange} />
                            </label>
                            <label>
                                Estudios:
                                <select className="customInput">
                                    <option value="ninguno">Ninguno</option>
                                    <option value="primaria">Primaria</option>
                                    <option value="secundaria">Secundaria</option>
                                    <option value="universidad">Universidad</option>
                                </select>
                            </label>
                            <label>
                                Años mayor nivel:
                                <input
                                    type="number"
                                    placeholder="Años mayor nivel"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Estado Civil:
                                <select className="customInput">
                                    <option value="casada">Casada</option>
                                    <option value="union estable">Union Estable</option>
                                    <option value="soltera">Soltera</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </label>
                            <label>
                                Vive Sola:
                                <ToggleSwitch isChecked={false} onChange={handleToggleChange} />
                            </label>
                            <label>
                                N° Expediente Unico:
                                <input
                                    type="text"
                                    placeholder="Expediente Unico"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                N° INSS:
                                <input type="text" placeholder="Inss" className="customInput" />
                            </label>
                            <label>
                                N° Identidad:
                                <input
                                    type="text"
                                    placeholder="Identidad"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Codigo Lugar APN:
                                <input
                                    type="text"
                                    placeholder="Codigo de Lugar de APN"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Nombres U/S APN:
                                <input
                                    type="text"
                                    placeholder="Nombres U/S de APN"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Codigo Lugar Parto:
                                <input
                                    type="text"
                                    placeholder="Codigo lugar del Parto"
                                    className="customInput"
                                />
                            </label>
                            <label>
                                Nombres U/S Parto:
                                <input
                                    type="text"
                                    placeholder="Nombres U/S de Parto"
                                    className="customInput"
                                />
                            </label>
                        </div>
                        <div className="antecedentesContainer">
                            <h2 className="antecedentesTitle">Antecedentes</h2>
                            <table className="antecedentesTable">
                                <tbody>
                                    <tr>
                                        <td className="columnFamiliares">Familiares</td>
                                        <td className="columnEnfermedades">Enfermedades</td>
                                        <td className="columnPersonales">Personales</td>
                                    </tr>
                                    {conditions.map((condition) => (
                                        <tr key={condition}>
                                            <td>
                                                <ToggleSwitch onChange={handleToggleChange} />
                                            </td>
                                            <td>{condition}</td>
                                            <td>
                                                <ToggleSwitch onChange={handleToggleChange} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <label>
                                Otro:
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="customInput"
                                />
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const ToggleSwitch = ({ initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        // Informamos al componente padre del nuevo estado
        onChange(newCheckedState);
    };

    return (
        <label className={`switchFirstModule ${isChecked ? "checked" : ""}`}>
            <input type="checkbox" checked={isChecked} onChange={handleToggle} />
            <span className="sliderFirstModule"></span>
            <span className={`switch-text ${isChecked ? "checked" : ""}`}>
                {isChecked ? "Sí" : "No"}
            </span>
        </label>
    );
};

ToggleSwitch.propTypes = {
    initialChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

ToggleSwitch.defaultProps = {
    initialChecked: false,
};

FirstModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default FirstModuleScreen;
