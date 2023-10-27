import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useEffect,useState } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import "../styles/fourtModuleStyle.css";
import Switch from 'react-switch';

const FourthModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem("cachedId");

    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };

    // Estado para los datos del recién nacido
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

    // Estado para los datos de reanimación
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

    // Estado para almacenar los datos recuperados de Firebase
    const [firebaseData, setFirebaseData] = useState(null);

    // UseEffect para cargar los datos desde Firebase al montar el componente
    useEffect(() => {
        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.ModuloPuerperio) {
                            const { RecienNacido, Reanimacion } = data.ModuloPuerperio;
                            // Establecer los datos recuperados en el estado
                            setRecienNacido(RecienNacido);
                            setReanimacion(Reanimacion);
                        }
                    }
                });
            } catch (error) {
                console.log("Error al cargar datos desde Firebase", error);
            }
        }
    }, [cachedId]);

    // Manejar cambios en los datos del recién nacido
    const handleRecienNacido = (index, field, newValue) => {
        const updatedRecienNacido = [...RecienNacido];
        updatedRecienNacido[index][field] = newValue ? "si" : "no";
        setRecienNacido(updatedRecienNacido);
    };

    // Manejar cambios en los datos de reanimación
    const handleReanimacion = (index, field, newValue) => {
        const updatedReanimacion = [...Reanimacion];
        updatedReanimacion[index][field] = newValue ? "si" : "no";
        setReanimacion(updatedReanimacion);
    };

    // Manejar el envío de datos a Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                const doc = await docRef.get();

                if (doc.exists) {
                    const data = doc.data();
                    data.ModuloPuerperio = {
                        RecienNacido: RecienNacido,
                        Reanimacion: Reanimacion,
                    };

                    await docRef.set(data);

                    window.alert("Datos enviados con éxito");

                    // Limpiar los campos del formulario después del envío
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

    const handleButtonClick = () => {
        setLocation("/modules");
    }

    return (
        <div>
            <NavBarComponent onSignOut={handleLogout} showCloseExpedienteButton={false} />


            <form className="formFourthModule" onSubmit={handleSubmit}>
    {RecienNacido.map((item, index) => (
        <div key={index}>
            <h2>Recien Nacido</h2>
            <div className="formularioFourthModule">
                <div className="formularioFourthChildren">
                    <label>Sexo</label>
                    <select
                        className="recienNacidoSelect"
                        value={RecienNacido[index].sexo}
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
                        value={RecienNacido[index].pesoAlNacer}
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
                        value={RecienNacido[index].p_Cefalico_cm}
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
                        value={RecienNacido[index].longitud_cm}
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
                        value={RecienNacido[index].semanas_Gestacional}
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
                        value={RecienNacido[index].dias_Gestacional}
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
                        value={RecienNacido[index].edad_Gestacional}
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
                        value={RecienNacido[index].peso_EG}
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
                    
                    <Switch
                        id={`vitamina_K${index}`}
                        checked={RecienNacido[index].vitamina_K === "si"}
                        onChange={(newValue) =>
                            handleRecienNacido(index, "vitamina_K", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Propfilasis Ocular</label>

                    <Switch
                        id={`propfilasis_ocular${index}`}
                        checked={RecienNacido[index].propfilasis_ocular === "si"}
                        onChange={(newValue) =>
                            handleRecienNacido(
                                index,
                                "propfilasis_ocular",
                                newValue
                            )
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Apego Precoz</label>
                    <Switch
                        id={`apego_precoz${index}`}
                        checked={RecienNacido[index].apego_precoz === "si"}
                        onChange={(newValue) =>
                            handleRecienNacido(index, "apego_precoz", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
            </div>
        </div>
    ))}
    {/* Reanimacion */}
   
    <h2>Reanimación</h2>
    {Reanimacion.map((item, index) => (
        <div key={index}>
            <div className="formularioFourthModule">
                <div className="formularioFourthChildren">
                    <label>Estimulacion</label>
                
                    <Switch
                        id={`estimulacion${index}`}
                        checked={Reanimacion[index].estimulacion === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "estimulacion", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Aspiracion</label>
                    <Switch
                        id={`aspiracion${index}`}
                        checked={Reanimacion[index].aspiracion === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "aspiracion", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                />
                </div>
                <div className="formularioFourthChildren">
                    <label>Mascara</label>
                    <Switch
                        id={`mascara${index}`}
                        checked={Reanimacion[index].mascara === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "mascara", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Oxigeno</label>
                    <Switch
                        id={`oxigeno${index}`}
                        checked={Reanimacion[index].oxigeno === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "oxigeno", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Masaje</label>
                    <Switch
                        id={`masaje${index}`}
                        checked={Reanimacion[index].masaje === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "masaje", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Tubo</label>
                    <Switch
                        id={`tubo${index}`}
                        checked={Reanimacion[index].tubo === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "tubo", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Otros</label>
                    <Switch
                        id={`otros${index}`}
                        checked={Reanimacion[index].otros === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "otros", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
                </div>
                <div className="formularioFourthChildren">
                    <label>Fallece lugar de parto:</label>
                    <Switch
                        id={`fallece_lugar_De_Parto${index}`}
                        checked={Reanimacion[index].fallece_lugar_De_Parto === "si"}
                        onChange={(newValue) =>
                            handleReanimacion(index, "fallece_lugar_De_Parto", newValue)
                        }
                        onColor="#eff303" // Color cuando está en posición "Sí"
                        offColor="#888888" // Color cuando está en posición "No"
                    />
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