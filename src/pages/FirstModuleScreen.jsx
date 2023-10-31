import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import { departmentsData } from "../utils/departamentsData";
import "../styles/firstModuleStyle.css";

const FirstModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem("cachedId");
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [municipalities, setMunicipalities] = useState([]);


    const [DatosAfiliacion, setDatosAfiliacion] = useState([
        {
            Nombres: "",
            Apellidos: "",
            Domicilio: "",
            Municipio_de_Residencia: "",
            Telefono: "",
            Otra_condición_grave: "",
            Codigo_lugar_Apn: "",
            Nombre_de_Apn: "",
            Fecha_Nacimiento: "",
            Edad: "",
            Ednia: "",
            Alfa_Beta: "",
            Estudios: "",
            Estado_Civil: "",
            Numero_Expediente_Unico: "",
            Numero_INS: "",
            Numero_Identidad: "",
        },
    ]);

    const handleDatosAfiliacion = (index, field, value) => {
        const updatedDatosAfiliacion = [...DatosAfiliacion];
        updatedDatosAfiliacion[index][field] = value;
        setDatosAfiliacion(updatedDatosAfiliacion);
    };

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };



    const handleButtonClick = () => {
        setLocation("/modules");
    }

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
        setMunicipalities(departmentsData[e.target.value] || []);
    }



    // UseEffect para cargar los datos desde Firebase al montar el componente
    useEffect(() => {
        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.ModuloFiliacion) {
                            const { DatosAfiliacion } = data.ModuloFiliacion;
                            // Establecer los datos recuperados en el estado
                            setDatosAfiliacion(DatosAfiliacion);

                        }
                    }
                });
            } catch (error) {
                console.log("Error al cargar datos desde Firebase", error);
            }
        }
    }, [cachedId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                const doc = await docRef.get();

                if (doc.exists) {
                    const data = doc.data();
                    data.ModuloFiliacion = {
                        DatosAfiliacion: DatosAfiliacion,
                    };

                    await docRef.set(data);

                    alert("Datos enviados con éxito");
                    setDatosAfiliacion([
                        {
                            Nombres: "",
                            Apellidos: "",
                            Domicilio: "",
                            Municipio_de_Residencia: "",
                            Telefono: "",
                            Otra_condición_grave: "",
                            Codigo_lugar_Apn: "",
                            Nombre_de_Apn: "",
                            Fecha_Nacimiento: "",
                            Edad: "",
                            Ednia: "",
                            Alfa_Beta: "",
                            Estudios: "",
                            Estado_Civil: "",
                            Numero_Expediente_Unico: "",
                            Numero_INS: "",
                            Numero_Identidad: "",
                        },
                    ]);
                } else {
                    console.error("El documento no existe");
                }
            } catch (error) {
                console.log("Error al actualizar datos en Firebase", error);
            }
        } else {
            alert.alert("No se pudo encontrar un ID válido en localStorage");
        }
    };

    return (
        <div className="firstModuleScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={handleLogout} showCloseExpedienteButton={false} />

                <div className="sectionInformation">
                    <h2 className="title">
                        Historia Clínica Perinatal - CLAP/SMR-OPS/OMS
                    </h2>
                    <div className="alertGroup">
                        <span className="alert"></span>
                        <h2 className="alertTitle">Amarillo es ALERTA</h2>
                    </div>
                </div>
                <form className="formFourthModule" onSubmit={handleSubmit}>
                    {DatosAfiliacion.map((item, index) => (
                        <div key={index}>
                            <div className="formularioFourthModule">
                                <div className="formularioFourthChildren">
                                    <label >Nonbre</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="inputNumberFourth"
                                        value={DatosAfiliacion[index].Nombres}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Nombres", e.target.value)
                                        }
                                    />

                                </div>
                                <div className="formularioFourthChildren">
                                    <label >Apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Apellidos"
                                        className="inputNumberFourth"
                                        value={item.Apellidos}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Apellidos", e.target.value)
                                        }
                                    />

                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Domicilio</label>
                                    <input
                                        type="text"
                                        placeholder="Domicilio"
                                        className="inputNumberFourth"
                                        value={item.Domicilio}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Domicilio", e.target.value)
                                        }
                                    />

                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Municipio</label>
                                    <input
                                        type="text"
                                        placeholder="Municipio"
                                        className="inputNumberFourth"
                                        value={item.Municipio_de_Residencia}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(
                                                index,
                                                "Municipio_de_Residencia",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Telefono</label>
                                    <input
                                        type="number"
                                        placeholder="Telefono"
                                        className="inputNumberFourth"
                                        value={item.Telefono}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Telefono", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Fecha Nacimiento</label>
                                    <input
                                        type="date"
                                        placeholder="Fecha Nac"
                                        className="inputNumberFourth"
                                        value={item.Fecha_Nacimiento}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(
                                                index,
                                                "Fecha_Nacimiento",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Edad</label>
                                    <input
                                        type="number"
                                        placeholder="Edad"
                                        className="inputNumberFourth"
                                        value={item.Edad}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Edad", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> Etnia:</label>
                                    <select
                                        className="inputNumberFourth"
                                        value={item.Ednia}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Ednia", e.target.value)
                                        }
                                    >
                                        <option>Opciones</option>
                                        <option value="blanca">Blanca</option>
                                        <option value="indigena">Indígena</option>
                                        <option value="mestiza">Mestiza</option>
                                        <option value="negra">Negra</option>
                                        <option value="otra">Otra</option>
                                    </select>
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> Estudios:</label>
                                    <select
                                        className="inputNumberFourth"
                                        value={item.Estudios}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Estudios", e.target.value)
                                        }
                                    >
                                        <option>Opciones</option>
                                        <option value="ninguno">Ninguno</option>
                                        <option value="primaria">Primaria</option>
                                        <option value="secundaria">Secundaria</option>
                                        <option value="universidad">Universidad</option>
                                    </select>
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> Estado Civil:</label>
                                    <select
                                        className="inputNumberFourth"
                                        value={item.Estado_Civil}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Estado_Civil", e.target.value)
                                        }
                                    >
                                        <option>Opciones</option>
                                        <option value="casada">Casada</option>
                                        <option value="union estable">Unión Estable</option>
                                        <option value="soltera">Soltera</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>  N° Expediente Unico:</label>
                                    <input
                                        type="text"
                                        placeholder="Expediente Unico"
                                        className="inputNumberFourth"
                                        value={item.Numero_Expediente_Unico}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(
                                                index,
                                                "Numero_Expediente_Unico",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> N° Identidad:</label>
                                    <input
                                        type="text"
                                        placeholder="Identidad"
                                        className="inputNumberFourth"
                                        value={item.Numero_Identidad}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Numero_Identidad", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> Codigo Lugar APN:</label>
                                    <input
                                        type="text"
                                        placeholder="Codigo de Lugar de APN"
                                        className="inputNumberFourth"
                                        value={item.Codigo_lugar_Apn}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Codigo_lugar_Apn", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Nombres U/S APN:</label>
                                    <input
                                        type="text"
                                        placeholder="Nombres U/S de APN"
                                        className="inputNumberFourth"
                                        value={item.Nombre_de_Apn}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Nombre_de_Apn", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label> Codigo Lugar Parto:</label>
                                    <input
                                        type="text"
                                        placeholder="Codigo lugar del Parto"
                                        className="inputNumberFourth"
                                        value={item.Codigo_lugar_Apn}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Codigo_lugar_Apn", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Nombres U/S Parto:</label>
                                    <input
                                        type="text"
                                        placeholder="Nombres U/S de Parto"
                                        className="inputNumberFourth"
                                        value={item.Nombre_de_Apn}
                                        onChange={(e) =>
                                            handleDatosAfiliacion(index, "Nombre_de_Apn", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Departamento: </label>
                                    <select className="inputNumberFourth" value={selectedDepartment} onChange={handleDepartmentChange}>
                                        <option value="">Selecciona un departamento</option>
                                        {Object.keys(departmentsData).map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Municipio: </label>
                                    <select className="inputNumberFourth" value={item.Municipio} onChange={(e) =>
                                        handleDatosAfiliacion(index, "Municipio", e.target.value)} disabled={!selectedDepartment}>
                                        <option value="">Selecciona un municipio</option>
                                        {municipalities.map(muni => (
                                            <option key={muni} value={muni}>{muni}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="containerButtonFourth">
                        <button className="ButtonEnviarFourth" type="submit">
                            Guardar
                        </button>
                        <button className="ButtonCancelFourth" type="button" onClick={handleButtonClick}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ToggleSwitch = ({ initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
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
