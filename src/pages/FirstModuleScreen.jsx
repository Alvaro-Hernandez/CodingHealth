import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import "../styles/firstModuleStyle.css";
import Select from 'react-select'

const FirstModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem("cachedId");
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

    // Funciones para el Togle Switch

    // const handleToggleChange = (value) => {
    //     console.log(value);
    // };

    // const handleInputChange = (e) => {
    //     if (e.target.value.length > 8) {
    //         e.target.value = e.target.value.slice(0, 8);
    //     }
    // };

    const handleButtonClick = () => {
        setLocation("/modules");
    }

    const options = [
        { value: 'Chichigalpa', label: 'Chichigalpa' },
        { value: 'Chinandega', label: 'Chinandega' },
        { value: 'Cinco Pinos', label: 'Cinco Pinos' },
        { value: 'Corinto', label: 'Corinto' },
        { value: 'El Realejo', label: 'El Realejo' },
        { value: 'El Viejo', label: 'El Viejo' },
        { value: 'Posoltega', label: 'Posoltega' },
        { value: 'Puerto Morazán', label: 'Puerto Morazán' },
        { value: 'San Francisco del Norte', label: 'San Francisco del Norte' },
        { value: 'San Pedro del Norte', label: 'San Pedro del Norte' },
        { value: 'Santo Tomás del Norte', label: 'Santo Tomás del Norte' },
        { value: 'Somotillo', label: 'Somotillo' },
        { value: 'Villanueva Acoyapa', label: 'Villanueva Acoyapa' },
        { value: 'Comalapa', label: 'Comalapa' },
        { value: 'Cuapa', label: 'Cuapa' },
        { value: 'El Coral', label: 'El Coral' },
        { value: 'Juigalpa', label: 'Juigalpa' },
        { value: 'La Libertad', label: 'La Libertad' },
        { value: 'San Pedro de Lóvago', label: 'San Pedro de Lóvago' },
        { value: 'Santo Domingo', label: 'Santo Domingo' },
        { value: 'Santo Tomás', label: 'Santo Tomás' },
        { value: 'Villa Sandino', label: 'Villa Sandino' },
        { value: 'Bonanza', label: 'Bonanza' },
        { value: 'Mulukukú', label: 'Mulukukú' },
        { value: 'Prinzapolka', label: 'Prinzapolka' },
        { value: 'Bilwi', label: 'Bilwi' },
        { value: 'Rosita', label: 'Rosita' },
        { value: 'Siuna', label: 'Siuna' },
        { value: 'Waslala', label: 'Waslala' },
        { value: 'Waspán', label: 'Waspán' },
        { value: 'luefields', label: 'luefields' },
        { value: 'Corn Island', label: 'Corn Island' },
        { value: 'Desembocadura de Río Grande', label: 'Desembocadura de Río Grande' },
        { value: 'El Ayote', label: 'El Ayote' },
        { value: 'El Rama', label: 'El Rama' },
        { value: 'El Tortuguero', label: 'El Tortuguero' },
        { value: 'Kukra Hill', label: 'Kukra Hill' },
        { value: 'La Cruz de Río Grande', label: 'La Cruz de Río Grande' },
        { value: 'Laguna de Perlas', label: 'Laguna de Perlas' },
        { value: 'Muelle de los Bueyes', label: 'Muelle de los Bueyes' },
        { value: 'Nueva Guinea', label: 'Nueva Guinea' },
        { value: 'Paiwas', label: 'Paiwas' },
        { value: 'Condega', label: 'Condega' },
        { value: 'Estelí', label: 'Estelí' },
        { value: 'La Trinidad', label: 'La Trinidad' },
        { value: 'Pueblo Nuevo', label: 'Pueblo Nuevo' },
        { value: 'San Juan de Limay', label: 'San Juan de Limay' },
        { value: 'San Nicolás Diriá', label: 'San Nicolás Diriá' },
        { value: 'Diriomo', label: 'Diriomo' },
        { value: 'Granada', label: 'Granada' },
        { value: 'Nandaime', label: 'Nandaime' },
        { value: 'El Cuá', label: 'El Cuá' },
        { value: 'Jinotega', label: 'Jinotega' },
        { value: 'La Concordia', label: 'La Concordia' },
        { value: 'San José de Bocay', label: 'San José de Bocay' },
        { value: 'San Rafael del Norte', label: 'San Rafael del Norte' },
        { value: 'San Sebastián de Yalí', label: 'San Sebastián de Yalí' },
        { value: 'Santa María de Pantasma', label: 'Santa María de Pantasma' },
        { value: 'Wiwilí de Jinotega', label: 'Wiwilí de Jinotega' },
        { value: 'Achuapa', label: 'Achuapa' },
        { value: 'El Jicaral', label: 'El Jicaral' },
        { value: 'El Sauce', label: 'El Sauce' },
        { value: 'La Paz Centro', label: 'La Paz Centro' },
        { value: 'Larreynaga', label: 'Larreynaga' },
        { value: 'León', label: 'León' },
        { value: 'Nagarote', label: 'Nagarote' },
        { value: 'Quezalguaque', label: 'Quezalguaque' },
        { value: 'Santa Rosa del Peñón', label: 'Santa Rosa del Peñón' },
        { value: 'Telica', label: 'Telica' },
        { value: 'Las Sabanas', label: 'Las Sabanas' },
        { value: 'Palacagüina', label: 'Palacagüina' },
        { value: 'San José de Cusmapa', label: 'San José de Cusmapa' },
        { value: 'San Juan de Río Coco', label: 'San Juan de Río Coco' },
        { value: 'San Lucas', label: 'San Lucas' },
        { value: 'Somoto', label: 'Somoto' },
        { value: 'Telpaneca', label: 'Telpaneca' },
        { value: 'Totogalpa', label: 'Totogalpa' },
        { value: 'Yalagüina', label: 'Yalagüina' },
        { value: 'Ciudad Sandino', label: 'Ciudad Sandino' },
        { value: 'El Crucero', label: 'El Crucero' },
        { value: 'Managua', label: 'Managua' },
        { value: 'Mateare', label: 'Mateare' },
        { value: 'San Francisco Libre', label: 'San Francisco Libre' },
        { value: 'San Rafael del Sur', label: 'San Rafael del Sur' },
        { value: 'Ticuantepe', label: 'Ticuantece' },
        { value: 'Tipitapa', label: 'Tipitapa' },
        { value: 'Villa El Carmen', label: 'Villa El Carmen' },
        { value: 'Catarina', label: 'Catarina' },
        { value: 'La Concepción', label: 'La Concepción' },
        { value: 'Masatepe', label: 'Masatepe' },
        { value: 'Masaya', label: 'Masaya' },
        { value: 'Nandasmo', label: 'Nandasmo' },
        { value: 'Nindirí', label: 'Nindirí' },
        { value: 'Niquinohomo', label: 'Niquinohomo' },
        { value: 'San Juan de Oriente', label: 'San Juan de Oriente' },
        { value: 'Tisma', label: 'Tisma' },
        { value: 'Ciudad Darío', label: 'Ciudad Darío' },
        { value: 'El Tuma - La Dalia', label: 'El Tuma - La Dalia' },
        { value: 'Esquipulas', label: 'Esquipulas' },
        { value: 'Matagalpa', label: 'Matagalpa' },
        { value: 'Matiguás', label: 'Matiguás' },
        { value: 'Muy Muy', label: 'Muy Muy' },
        { value: 'Rancho Grande', label: 'Rancho Grande' },
        { value: 'Río Blanco', label: 'Río Blanco' },
        { value: 'San Dionisio', label: 'San Dionisio' },
        { value: 'San Isidro', label: 'San Isidro' },
        { value: 'San Ramón', label: 'San Ramón' },
        { value: 'Sébaco', label: 'Sébaco' },
        { value: 'Terrabona', label: 'Terrabona' },
        { value: 'Ciudad Antigua', label: 'Ciudad Antigua' },
        { value: 'Dipilto', label: 'Dipilto' },
        { value: 'El Jícaro', label: 'El Jícaro' },
        { value: 'Jalapa', label: 'Jalapa' },
        { value: 'Macuelizo', label: 'Macuelizo' },
        { value: 'Mozonte', label: 'Mozonte' },
        { value: 'Murra', label: 'Murra' },
        { value: 'Ocotal', label: 'Ocotal' },
        { value: 'Quilalí', label: 'Quilalí' },
        { value: 'San Fernando', label: 'San Fernando' },
        { value: 'Santa María', label: 'Santa María' },
        { value: 'Wiwilí El Almendro', label: 'Wiwilí El Almendro' },
        { value: 'El Castillo', label: 'El Castillo' },
        { value: 'Morrito', label: 'Morrito' },
        { value: 'San Carlos', label: 'San Carlos' },
        { value: 'San Juan del Norte', label: 'San Juan del Norte' },
        { value: 'San Miguelito', label: 'San Miguelito' },
        { value: 'Altagracia', label: 'Altagracia' },
        { value: 'Belén', label: 'Belén' },
        { value: 'Buenos Aires', label: 'Buenos Aires' },
        { value: 'Cárdenas', label: 'Cárdenas' },
        { value: 'Moyogalpa', label: 'Moyogalpa' },
        { value: 'Potosí', label: 'Potosí' },
        { value: 'Rivas', label: 'Rivas' },
        { value: 'San Jorge', label: 'San Jorge' },
        { value: 'San Juan del Sur', label: 'San Juan del Sur' },
        { value: 'Tola', label: 'Tola' }
    ];

    const options1 = [
        { value: 'Atlántico Norte', label: 'Atlántico Norte' },
        { value: 'Atlántico Sur', label: 'Atlántico Sur' },
        { value: 'Boaco', label: 'Boaco' },
        { value: 'Carazo', label: 'Carazo' },
        { value: 'Chinandega', label: 'Chinandega' },
        { value: 'Chontales', label: 'Chontales' },
        { value: 'Estelí', label: 'Estelí' },
        { value: 'Granada', label: 'Granada' },
        { value: 'Jinotega', label: 'Jinotega' },
        { value: 'León', label: 'León' },
        { value: 'Madriz', label: 'Madriz' },
        { value: 'Managua', label: 'Managua' },
        { value: 'Masaya', label: 'Masaya' },
        { value: 'Matagalpa', label: 'Matagalpa' },
        { value: 'Nueva Segovia', label: 'Nueva Segovia' },
        { value: 'Río San Juan', label: 'Río San Juan' },
        { value: 'Rivas', label: 'Rivas' }
    ];






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

                    window.alert("Datos enviados con éxito");
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
            window.alert("No se pudo encontrar un ID válido en localStorage");
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
                                        value={item.Nombres}
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
                                    <label>Departamento</label>
                                    <Select options={options1} />

                                </div>
                                <div className="formularioFourthChildren">
                                    <label>Municipio</label>
                                    <Select options1={options} />

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
