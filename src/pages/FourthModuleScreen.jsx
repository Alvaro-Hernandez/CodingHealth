import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useState } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import "../styles/fourtModuleStyle.css";

const FourthModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem("cachedId");

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };

    const [RecienNacido, setRecienNacido] = useState([
        {
            sexo: "",
            pesoAlNacer: "",
            p_Cefalico_cm: "",
            longitud_cm: "",
            edad_Gestacional: "",
            semanas_Gestacional: "",
            dias_Gestacional: "",
            Diagnosticada_Por: "",
            peso_EG: "",
            vitamina_K: "",
            propfilasis_ocular: "",
            apego_precoz: "",
        },
    ]);

    const [Reanimacion, setReanimacion] = useState([
        {
            estimulacion: "",
            aspiracion: "",
            mascara: "",
            oxigeno: "",
            masaje: "",
            tubo: "",
            otros: "",
            fallece_lugar_De_Parto: ""
        },
    ]);

    const handleRecienNacido = (index, field, value) => {
        const updatedRecienNacido = [...RecienNacido];
        updatedRecienNacido[index][field] = value;
        setRecienNacido(updatedRecienNacido);
    };

    const handleReanimacion = (index, field, value) => {
        const updatedReanimacion = [...Reanimacion];
        updatedReanimacion[index][field] = value;
        setReanimacion(updatedReanimacion);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                const doc = await docRef.get();

                if (doc.exists) {
                    // Obten los datos actuales del documento
                    const data = doc.data();
                    data.ModuloPuerperio = {
                        RecienNacido: RecienNacido,
                        Reanimacion: Reanimacion,
                    };

                    await docRef.set(data);

                    window.alert("Datos enviados con éxito");

                    setRecienNacido([
                        {
                            sexo: "",
                            pesoAlNacer: "",
                            p_Cefalico_cm: "",
                            longitud_cm: "",
                            edad_Gestacional: "",
                            semanas_Gestacional: "",
                            dias_Gestacional: "",
                            Diagnosticada_Por: "",
                            peso_EG: "",
                            vitamina_K: "",
                            propfilasis_ocular: "",
                            apego_precoz: "",
                        },
                    ]);

                    setReanimacion([
                        {
                            estimulacion: "",
                            aspiracion: "",
                            mascara: "",
                            oxigeno: "",
                            masaje: "",
                            tubo: "",
                            otros: "",
                            fallece_lugar_De_Parto: ""
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
        <div>
            <NavBarComponent onSignOut={handleLogout} />

            <form className="formFourthModule" onSubmit={handleSubmit}>
                {RecienNacido.map((item, index) => (
                    <div key={index}>
                        <legend className="recienNacido"> Recien Nacido</legend>
                        <div className="formularioFourthModule">
                            <div className="formularioFourthChildren">
                                <label>Sexo</label>
                                <select
                                    className="recienNacidoSelect"
                                    value={item.sexo}
                                    onChange={(e) =>
                                        handleRecienNacido(index, "sexo", e.target.value)
                                    }
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="No definido">No definido</option>
                                </select>
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Peso al nacer</label>
                                <input
                                    className="inputNumberFourth"
                                    type="number"
                                    step="0.1"
                                    value={item.pesoAlNacer}
                                    onChange={(e) =>
                                        handleRecienNacido(index, "pesoAlNacer", e.target.value)
                                    }
                                    placeholder="(g)"
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>P Cefálico</label>
                                <input
                                    className="inputNumberFourth"
                                    type="number"
                                    value={item.p_Cefalico_cm}
                                    onChange={(e) =>
                                        handleRecienNacido(index, "p_Cefalico_cm", e.target.value)
                                    }
                                    placeholder="(cm)"
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Longitud</label>
                                <input
                                    className="inputNumberFourth"
                                    type="number"
                                    value={item.longitud_cm}
                                    onChange={(e) =>
                                        handleRecienNacido(index, "longitud_cm", e.target.value)
                                    }
                                    placeholder="(cm)"
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Semanas gestacionales</label>
                                <input
                                    className="inputNumberFourth"
                                    type="number"
                                    value={item.semanas_Gestacional}
                                    onChange={(e) =>
                                        handleRecienNacido(
                                            index,
                                            "semanas_Gestacional",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Días gestacionales</label>
                                <input
                                    className="inputNumberFourth"
                                    type="number"
                                    value={item.dias_Gestacional}
                                    onChange={(e) =>
                                        handleRecienNacido(
                                            index,
                                            "dias_Gestacional",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Edad gestacional</label>
                                <select
                                    className="recienNacidoSelect"
                                    value={item.edad_Gestacional}
                                    onChange={(e) =>
                                        handleRecienNacido(
                                            index,
                                            "edad_Gestacional",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Por FUM">Por FUM</option>
                                    <option value="POR ECO">POR ECO</option>
                                    <option value="Estimada">Estimada</option>
                                </select>
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Peso EG</label>
                                <select
                                    className="recienNacidoSelect"
                                    value={item.peso_EG}
                                    onChange={(e) =>
                                        handleRecienNacido(index, "peso_EG", e.target.value)
                                    }
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Adecuado">Adecuado</option>
                                    <option value="Pequeno">Pequeño</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Vitamina K</label>
                                <ToggleSwitch
                                    id={`vitamina_K${index}`}
                                    checked={RecienNacido.vitamina_K === "si"}
                                    onChange={(newValue) =>
                                        handleRecienNacido(index, "vitamina_K", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Propfilasis Ocular</label>
                                <ToggleSwitch
                                    id={`propfilasis_ocular${index}`}
                                    checked={RecienNacido.propfilasis_ocular === "si"}
                                    onChange={(newValue) =>
                                        handleRecienNacido(
                                            index,
                                            "propfilasis_ocular",
                                            newValue
                                        )
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Apego Precoz</label>
                                <ToggleSwitch
                                    id={`apego_precoz${index}`}
                                    checked={RecienNacido.apego_precoz === "si"}
                                    onChange={(newValue) =>
                                        handleRecienNacido(index, "apego_precoz", newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {/* Reanimacion */}
                <legend>Reanimacion</legend>
                {Reanimacion.map((item, index) => (
                    <div key={index}>
                        <div className="formularioFourthModule">
                            <div className="formularioFourthChildren">
                                <label>Estimulacion</label>
                                <ToggleSwitch
                                    id={`estimulacion${index}`}
                                    checked={Reanimacion.estimulacion === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "estimulacion", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Aspiracion</label>
                                <ToggleSwitch
                                    id={`aspiracion${index}`}
                                    checked={Reanimacion.aspiracion === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "aspiracion", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Mascara</label>
                                <ToggleSwitch
                                    id={`mascara${index}`}
                                    checked={Reanimacion.mascara === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "mascara", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Oxigeno</label>
                                <ToggleSwitch
                                    id={`oxigeno${index}`}
                                    checked={Reanimacion.oxigeno === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "oxigeno", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Masaje</label>
                                <ToggleSwitch
                                    id={`masaje${index}`}
                                    checked={Reanimacion.masaje === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "masaje", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Tubo</label>
                                <ToggleSwitch
                                    id={`tubo${index}`}
                                    checked={Reanimacion.tubo === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "tubo", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Otros</label>
                                <ToggleSwitch
                                    id={`otros${index}`}
                                    checked={Reanimacion.otros === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "otros", newValue)
                                    }
                                />
                            </div>
                            <div className="formularioFourthChildren">
                                <label>Fallece lugar de parto:</label>
                                <ToggleSwitch
                                    id={`fallece_lugar_De_Parto${index}`}
                                    checked={Reanimacion.fallece_lugar_De_Parto === "si"}
                                    onChange={(newValue) =>
                                        handleReanimacion(index, "fallece_lugar_De_Parto", newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="containerButtonFourth">
                    <button className="ButtonEnviarFourth" type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

const ToggleSwitch = ({ initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState); // Informar al componente padre del nuevo estado
    };

    return (
        <label className={`switch ${isChecked ? "checked" : ""}`}>
            <input type="checkbox" checked={isChecked} onChange={handleToggle} />
            <span className="slider"></span>
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

FourthModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default FourthModuleScreen;