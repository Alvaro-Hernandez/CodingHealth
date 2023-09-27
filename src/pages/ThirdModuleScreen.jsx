import NavBarComponent from "../components/NavbarComponent";
import { useState } from "react";
import { db } from '../services/FirebaseServices';
import '../styles/thirdModuleStyle.css';

const ThirdModuleScreen = () => {
    const [parto, setParto] = useState("");
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha
    const [consulta, setConsulta] = useState("");
    const [carnet, setCarnet] = useState(""); // Nuevo campo para el carné
    const [lugardeparto, setLugardeparto] = useState(""); // Lugar de parto
    const [Corticoides, setCorticoides] = useState(""); // Lugar de parto
    const [inicio, setInicio] = useState([]); // Lugar de parto
    const [edad, setedad] = useState([]); // Edad gestacional
    const [edadgestacional, setedadgestacional] = useState([]); // Edad gestacional
    const [diagestacional, setdiagestacional] = useState("");
    const [porFUM, setporFUM] = useState("");
    const [porECO, setporECO] = useState("");
    const [PresentacioSituacion, setPresentacioSituacion] = useState([]);
    const [TamañoFetalAcorde, setTamañoFetalAcorde] = useState("");
    const [transversa, settransversa] = useState("");
    const [acompañante, setacompañante] = useState("");
    const [Hospitalizado_en_Enbarazo, setHospitalizado_en_Enbarazo] = useState([]);
    const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);
    const [DiasHospitalizado, setDiasHospitalizado] = useState("");
    const [DetallesPartoGrama, setDetallesPartoGrama] = useState([
        {
            ID: "ID",
            Fecha: "",
            PosicionDelaMadre: "",
            PA: "",
            Pulso: "",
            Control_10: "",
            Dilatacion: "",
            AlturaPresente: "",
            VariedadPosic: "",
            Meconio: "",
            FCF_Dips: "",
        }

    ]);
    const [EnfermedadesData, setEnfermedades] = useState([
        {
            Enfermedades: "Enfermedades",
            HTAPrevia: "",
            HTAInducidaEmbarazo: "",
            PreeDampsia: "",
            Eclampsia: "",
            CardioPatia: "",
            Nefropatia: "",
            Diabetes: "",
            InfecOvular: "",
            InfeUrinaria: "",
            AmenazaPartoPreter: "",
            RCIU: "",
            RoturaPremDeMembranas: "",
            Anemia: "",
            OtraCondicionGrave: "",

        }

    ]);

    const [Hemorragias, setHemorragias] = useState([
        {
            Hemorragias: "Hemorragias",
            PrimerTrimestre: "",
            SegundoTrimestre: "",
            TercerTrimestre: "",
            PosParto: "",
            InfeccionPuerperal: "",
        }

    ]);
    const [Nacimiento, setNacimiento] = useState([
        {
            Id: "id",
            Vivo: "",
            Muerto: "",
            AnteParto: "",
            Parto: "",
            IgnoraMomento: "",
            Fecha: "",
        }

    ]);
    const [Posicion_Parto, setPosicion_Parto] = useState([
        {
            Id: "id",
            Solicitada_Por_Usuaria: "",
            Sentada: "",
            Acostada: "",
            Cunclillas: "",

        }

    ]);
    const handlePosicion_Parto = (index, field, value) => {
        const updatedPosicion_Parto = [...Posicion_Parto];
        updatedPosicion_Parto[index][field] = value;
        setEnfermedades(updatedPosicion_Parto);
    };
    const handleNacimiento = (index, field, value) => {
        const updatedNacimiento = [...Nacimiento];
        updatedNacimiento[index][field] = value;
        setEnfermedades(updatedNacimiento);
    };

    const handleEnfermedades = (index, field, value) => {
        const updatedEnfermedades = [...EnfermedadesData];
        updatedEnfermedades[index][field] = value;
        setEnfermedades(updatedEnfermedades);
    };


    const handleHemorragias = (index, field, value) => {
        const updatedHemorragias = [...Hemorragias];
        updatedHemorragias[index][field] = value;
        setHemorragias(updatedHemorragias);
    };
    const handleDetallesPartoGrama = (index, field, value) => {
        const updatedDetallesPartoGrama = [...DetallesPartoGrama];
        updatedDetallesPartoGrama[index][field] = value;
        setDetallesPartoGrama(updatedDetallesPartoGrama);
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación de campos

        setLoader(true);

        db.collection("Modulo Mujer")
            .add({
                Posicion_Parto: Posicion_Parto,
                Nacimiento: Nacimiento,
                Hemorragias: Hemorragias,
                EnfermedadesData: EnfermedadesData,
                DetallesPartoGrama: DetallesPartoGrama,
                DiasHospitalizado: DiasHospitalizado,
                mostrarCamposAdicionales: mostrarCamposAdicionales,
                Hospitalizado_en_Enbarazo: Hospitalizado_en_Enbarazo,
                acompañante: acompañante,
                transversa: transversa,
                TamañoFetalAcorde: TamañoFetalAcorde,
                PresentacioSituacion: PresentacioSituacion,
                porFUM: porFUM,
                porECO: porECO,
                diagestacional: diagestacional,
                parto: parto,
                message: message,
                date: selectedDate, // Agrega la fecha al objeto enviado a Firebase
                consulta: consulta, //consulta
                carnet: carnet, // Agregamos el valor del carné
                lugardeparto: lugardeparto, //Lugar de parto
                Corticoides: Corticoides,
                inicio: inicio,
                edad: edad,
                edadgestacional: edadgestacional,
            })
            .then(() => {
                setLoader(false);
                alert("ENVIADO CORRECTAMENTE👍");
            })
            .catch((error) => {
                alert(error.message);
                setLoader(false);
            });

        setParto("");
        setMessage("");
        setSelectedDate(new Date()); // Restablecer la fecha
        setConsulta("");
        setCarnet(""); // Reseteamos el valor del carné
        setLugardeparto("");//Resetamos lugar de parto
        setCorticoides("");
        setInicio("");
        setedad([]);
        setedadgestacional([]);
        setdiagestacional("");
        setporFUM("");
        setporECO("");
        setPresentacioSituacion([]);

        settransversa("");
        setTamañoFetalAcorde("");
        setacompañante("");
        setHospitalizado_en_Enbarazo([]);
        setMostrarCamposAdicionales(false);
        setDiasHospitalizado("");
        setDetallesPartoGrama([
            {
                ID: "ID",
                Fecha: "",
                PosicionDelaMadre: "",
                PA: "",
                Pulso: "",
                Control_10: "",
                Dilatacion: "",
                AlturaPresente: "",
                VariedadPosic: "",
                Meconio: "",
                FCF_Dips: "",
            }
        ]);
        setEnfermedades([
            {
                Enfermedades: "Enfermedades",
                HTAPrevia: "",
                HTAInducidaEmbarazo: "",
                PreeDampsia: "",
                Eclampsia: "",
                CardioPatia: "",
                Nefropatia: "",
                Diabetes: "",
                InfecOvular: "",
                InfeUrinaria: "",
                AmenazaPartoPreter: "",
                RCIU: "",
                RoturaPremDeMembranas: "",
                Anemia: "",
                OtraCondicionGrave: "",

            }

        ]);
        setHemorragias([
            {
                Hemorragias: "Hemorragias",
                PrimerTrimestre: "",
                SegundoTrimestre: "",
                TercerTrimestre: "",
                PosParto: "",
                InfeccionPuerperal: "",
            }

        ]);
        setNacimiento([
            {
                Id: "id",
                Vivo: "",
                Muerto: "",
                AnteParto: "",
                Parto: "",
                IgnoraMomento: "",
                Fecha: "",
            }

        ]);
        setPosicion_Parto([
            {
                Id: "id",
                Solicitada_Por_Usuaria: "",
                Sentada: "",
                Acostada: "",
                Cunclillas: "",

            }

        ]);

    };



    return (
        <div>

            <NavBarComponent />



            <section>
                <div className="form-container"> <h1 className="nombre">Modulo Madre 🤳</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="table-container">
                            <div className="row-container">
                                <div className="column">
                                    <label>Parto o Aborto</label>
                                    <select
                                        value={parto}
                                        onChange={(e) => setParto(e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Parto">Parto</option>
                                        <option value="Aborto">Aborto</option>

                                    </select>
                                </div>
                                <div className="column">
                                    <label>Consultas Prenatales Totales</label>
                                    <input
                                        type="number"
                                        placeholder="Numero de consultas"
                                        value={consulta}
                                        onChange={(e) => setConsulta(e.target.value)}
                                    />
                                </div>
                                <div className="column">
                                    <label>Lugar de Parto</label>
                                    <select
                                        value={lugardeparto}
                                        onChange={(e) => setLugardeparto(e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Institucional">Institucional</option>
                                        <option value="Domiciliar">Domiciliar</option>
                                        <option value="Otro">Otro</option>s
                                    </select>
                                </div>
                                <div className="column">
                                    <label> Corticoides Antenatales</label>
                                    <select
                                        value={Corticoides}
                                        onChange={(e) => setCorticoides(e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Completo">Completo</option>
                                        <option value="Incompleto">Incompleto</option>
                                        <option value="ninguno">ninguno</option>
                                        <option value="n/c">n/c</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label>Tienes carnet</label>
                                    <select
                                        value={carnet}
                                        onChange={(e) => setCarnet(e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row-container">
                                <div className="column">
                                    <label>Inicio</label>
                                    <select
                                        multiple
                                        value={inicio}
                                        onChange={(e) => setInicio(Array.from(e.target.selectedOptions, option => option.value))}
                                    >
                                        <option value="Expontaneo">Expontaneo</option>
                                        <option value="Inducido">Inducido</option>
                                        <option value="cesar.Elec">cesar.Elec</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label>Presentación Situación</label>
                                    <select
                                        multiple
                                        value={PresentacioSituacion}
                                        onChange={(e) => setPresentacioSituacion(Array.from(e.target.selectedOptions, option => option.value))}
                                    >
                                        <option value="Cefática">Cefática</option>
                                        <option value="Pélvico">Pélvico</option>
                                        <option value="Transversa">Transversa</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label>Ructura prematura de menbrana</label>
                                    <select
                                        multiple
                                        value={edad}
                                        onChange={(e) => setedad(Array.from(e.target.selectedOptions, option => option.value))}
                                    >
                                        <option value="SI">Si</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                                <div className="column">
                                    <label>Edad Gestacional Al Parto</label>
                                    <input
                                        type="number"
                                        placeholder="Semanas"
                                        value={edadgestacional}
                                        onChange={(e) => setedadgestacional(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row-container">
                                <div className="column">
                                    <label>Dia Gestacional</label>
                                    <input
                                        type="number"
                                        placeholder="Dias"
                                        value={diagestacional}
                                        onChange={(e) => setdiagestacional(e.target.value)}
                                    />
                                </div>
                                <div className="column">
                                    <label>Tamaño Fetal Acorde</label>
                                    <select
                                        value={TamañoFetalAcorde}
                                        onChange={(e) => setTamañoFetalAcorde(e.target.value)}
                                        className="custom-select"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="column">
                                    <label>Hospitalizado en Enbarazo</label>
                                    <select
                                        multiple
                                        value={Hospitalizado_en_Enbarazo}
                                        onChange={(e) => {
                                            setHospitalizado_en_Enbarazo(Array.from(e.target.selectedOptions, option => option.value));
                                            setMostrarCamposAdicionales(e.target.value === 'SI');
                                        }}
                                    >
                                        <option value="SI">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                    {mostrarCamposAdicionales && (
                                        <div >
                                            {/* Aquí coloca los campos adicionales que deseas mostrar */}
                                            <label>Dias En Embarazo:</label>
                                            <input
                                                type="text"
                                                value={DiasHospitalizado}
                                                onChange={(e) => setDiasHospitalizado(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="column">
                                    <label>Message</label>
                                    <textarea
                                        placeholder="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="column">
                                    <label
                                        className={`opcion ${setporFUM === "Por FUM" ? "seleccionado" : ""}`}
                                        onClick={() => setporFUM("Por FUM")}
                                    >
                                        <input
                                            type="radio"
                                            name="opcionECO"
                                            value="Por FUM"
                                            checked={setporFUM === "Por FUM"}
                                            onChange={() => { }}
                                        />
                                        <div className=""></div> {/* Agregar un div para el círculo */}
                                        Por FUM
                                    </label>
                                </div>
                                <div className="column">
                                    <label
                                        className={`opcion ${setporECO === "Por ECO" ? "seleccionado" : ""}`}
                                        onClick={() => setporECO("Por ECO")}
                                    >
                                        <input
                                            type="radio"
                                            name="opcionECO"
                                            value="Por ECO"
                                            checked={setporECO === "Por ECO"}
                                            onChange={() => { }}
                                        />
                                        <div className=""></div> {/* Agregar un div para el círculo */}
                                        Por ECO
                                    </label>
                                </div>
                                <div className="column">
                                    <label>Acompañante</label>
                                    <select
                                        value={acompañante}
                                        onChange={(e) => setacompañante(e.target.value)}
                                        className="custom-select"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Pareja">Pareja</option>
                                        <option value="Familiar">Familiar</option>
                                        <option value="Ninguno">Ninguno</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/*  Esto es la tabla de detalles de partograma */}
                        <div className="table-container">
                            <div className="EstiloEnfer-medades">Detalle Partograma</div>
                            <table>
                                <tbody>
                                    {DetallesPartoGrama.map((detalle, index) => (
                                        <tr key={index}>
                                            <tr>
                                                <td>
                                                    <label>ID</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.ID}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'ID', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>Fecha</label>
                                                    <input
                                                        type="date"
                                                        value={detalle.Fecha}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'Fecha', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>PosicionDelaMadre</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.PosicionDelaMadre}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'PosicionDelaMadre', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>PA</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.PA}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'PA', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    < label>Pulso</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.Pulso}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'Pulso', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>Control_10</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.Control_10}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'Control_10', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Dilatacion</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.Dilatacion}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'Dilatacion', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>AlturaPresente</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.AlturaPresente}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'AlturaPresente', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>VariedadPosic</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.VariedadPosic}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'VariedadPosic', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>Meconio</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.Meconio}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'Meconio', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <label>FCF_Dips</label>
                                                    <input
                                                        type="text"
                                                        value={detalle.FCF_Dips}
                                                        onChange={(e) => handleDetallesPartoGrama(index, 'FCF_Dips', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* tabla de enfermedades  */}
                        <div className="table-container">
                            <div className="EstiloEnfer-medades">Enfermedades</div>
                            {EnfermedadesData.map((Enfermedades, index) => (
                                <div className="table-row" key={index}>
                                    <div className="trimestre-cell">Enfermedades</div>
                                    <div className="data-cell">
                                        <div className="data-item">
                                            <label>HTAPrevia</label>
                                            <div
                                                className={`opcion ${Enfermedades.HTAPrevia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "HTAPrevia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.HTAPrevia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "HTAPrevia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>HTAInducidaEmbarazo</label>
                                            <div
                                                className={`opcion ${Enfermedades.HTAInducidaEmbarazo === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "HTAInducidaEmbarazo", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.HTAInducidaEmbarazo === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "HTAInducidaEmbarazo", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>PreeDampsia</label>
                                            <div
                                                className={`opcion ${Enfermedades.PreeDampsia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "PreeDampsia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.PreeDampsia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "PreeDampsia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Eclampsia</label>
                                            <div
                                                className={`opcion ${Enfermedades.Eclampsia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Eclampsia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.Eclampsia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Eclampsia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>CardioPatia</label>
                                            <div
                                                className={`opcion ${Enfermedades.CardioPatia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "CardioPatia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.CardioPatia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "CardioPatia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Nefropatia</label>
                                            <div
                                                className={`opcion ${Enfermedades.Nefropatia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Nefropatia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.Nefropatia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Nefropatia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Diabetes</label>
                                            <div
                                                className={`opcion ${Enfermedades.Diabetes === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Diabetes", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.Diabetes === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Diabetes", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>InfecOvular</label>
                                            <div
                                                className={`opcion ${Enfermedades.InfecOvular === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "InfecOvular", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.InfecOvular === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "InfecOvular", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>InfeUrinaria</label>
                                            <div
                                                className={`opcion ${Enfermedades.InfeUrinaria === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "InfeUrinaria", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.InfeUrinaria === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "InfeUrinaria", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>AmenazaPartoPreter</label>
                                            <div
                                                className={`opcion ${Enfermedades.AmenazaPartoPreter === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "AmenazaPartoPreter", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.AmenazaPartoPreter === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "AmenazaPartoPreter", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>RCIU</label>
                                            <div
                                                className={`opcion ${Enfermedades.RCIU === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "RCIU", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.RCIU === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "RCIU", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>RoturaPremDeMembranas</label>
                                            <div
                                                className={`opcion ${Enfermedades.RoturaPremDeMembranas === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "RoturaPremDeMembranas", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.RoturaPremDeMembranas === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "RoturaPremDeMembranas", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Anemia</label>
                                            <div
                                                className={`opcion ${Enfermedades.Anemia === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Anemia", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.Anemia === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "Anemia", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>OtraCondicionGrave</label>
                                            <div
                                                className={`opcion ${Enfermedades.OtraCondicionGrave === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "OtraCondicionGrave", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${Enfermedades.OtraCondicionGrave === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleEnfermedades(index, "OtraCondicionGrave", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Este es el de Henfermedades tabla */}
                        <div className="table-container">
                            <div className="EstiloEnfer-medades">Hemorragias</div>
                            {Hemorragias.map((item, index) => (
                                <div className="table-row" key={index}>
                                    <div className="trimestre-cell">Hemorragias</div>
                                    <div className="data-cell">
                                        <div className="data-item">
                                            <label>Primer Trimestre</label>
                                            <div
                                                className={`opcion ${item.PrimerTrimestre === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "PrimerTrimestre", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${item.PrimerTrimestre === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "PrimerTrimestre", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Segundo Trimestre</label>
                                            <div
                                                className={`opcion ${item.SegundoTrimestre === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "SegundoTrimestre", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${item.SegundoTrimestre === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "SegundoTrimestre", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>Tercer Trimestre</label>
                                            <div
                                                className={`opcion ${item.TercerTrimestre === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "TercerTrimestre", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${item.TercerTrimestre === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "TercerTrimestre", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>PosParto</label>
                                            <div
                                                className={`opcion ${item.PosParto === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "PosParto", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${item.PosParto === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "PosParto", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <label>InfeccionPuerperal</label>
                                            <div
                                                className={`opcion ${item.InfeccionPuerperal === "si" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "InfeccionPuerperal", "si")
                                                }
                                            >
                                                <div className="circulo"></div> Sí
                                            </div>
                                            <div
                                                className={`opcion ${item.InfeccionPuerperal === "no" ? "seleccionado" : ""
                                                    }`}
                                                onClick={() =>
                                                    handleHemorragias(index, "InfeccionPuerperal", "no")
                                                }
                                            >
                                                <div className="circulo"></div> No
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Esta es la parte Nacimiento */}
                        <div className="table-container">
                            <div className="EstiloEnfer-medades">Nacimiento</div>
                            <table>
                                <tbody>
                                    {Nacimiento.map((detalle, index) => (
                                        <tr key={index}>
                                            <tr>
                                                <td>
                                                    <label>Vivo</label>
                                                    <select
                                                        value={detalle.Vivo}
                                                        onChange={(e) => handleNacimiento(index, 'Vivo', e.target.value)}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Vivo">Si</option>
                                                        <option value="Muerto">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <label>Muerto</label>
                                                    <select
                                                        value={detalle.Muerto}
                                                        onChange={(e) => handleNacimiento(index, 'Muerto', e.target.value)}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Muerto">Si</option>
                                                        <option value="Vivo">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <label>AnteParto</label>
                                                    <select
                                                        value={detalle.AnteParto}
                                                        onChange={(e) => handleNacimiento(index, 'AnteParto', e.target.value)}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Si">Si</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <label>Parto</label>
                                                    <select
                                                        value={detalle.Parto}
                                                        onChange={(e) => handleNacimiento(index, 'Parto', e.target.value)}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Si">Si</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <label>IgnoraMomento</label>
                                                    <select
                                                        value={detalle.IgnoraMomento}
                                                        onChange={(e) => handleNacimiento(index, 'IgnoraMomento', e.target.value)}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Si">Si</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <label>Fecha</label>
                                                    <input
                                                        type="Date"
                                                        value={detalle.FCF_Dips}
                                                        onChange={(e) => handleNacimiento(index, 'Fecha', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* tabla de Nacimiento */}
                        <div className="table-container">
                            <div className="EstiloEnfer-medades">Posicion Parto</div>
                            <table>
                                <tbody>
                                    {Posicion_Parto.map((detalle, index) => (
                                        <tr key={index}>
                                            <tr>
                                                <td>
                                                    <label>Nacimiento</label>
                                                    <select
                                                        value={detalle.Solicitada_Por_Usuaria}
                                                        onChange={(e) =>
                                                            handlePosicion_Parto(index, 'Solicitada_Por_Usuaria', e.target.value)
                                                        }
                                                    >
                                                        <option value="">Solicitada por la Usuaria</option>
                                                        <option value="Si">Si</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </td>
                                                {detalle.Solicitada_Por_Usuaria === 'Si' && (
                                                    <tr>
                                                        <td>
                                                            {/* Aquí coloca los campos adicionales que deseas mostrar */}
                                                            <label>Acostada</label>
                                                            <input
                                                                type="radio"
                                                                name={`posicion_${index}`}
                                                                value="Si"

                                                                onChange={(e) =>
                                                                    handlePosicion_Parto(index, 'Acostada', e.target.value)
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <label>Cunclillas</label>
                                                            <input
                                                                type="radio"
                                                                name={`posicion_${index}`}
                                                                value="Si"

                                                                onChange={(e) =>
                                                                    handlePosicion_Parto(index, 'Cunclillas', e.target.value)
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <label>Sentada</label>
                                                            <input
                                                                type="radio"
                                                                name={`posicion_${index}`}
                                                                value="Si"

                                                                onChange={(e) =>
                                                                    handlePosicion_Parto(index, 'Sentada', e.target.value)
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )}
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* estas son de prueba */}
                        <div className="table-container">
                            {Posicion_Parto.map((detalle, index) => (
                                <div className="row-container" key={index}>
                                    <div className="column">
                                        <label>Sentada</label>
                                        <input
                                            type="radio"
                                            name={`posicion_${index}`}
                                            value="Si"

                                            onChange={(e) =>
                                                handlePosicion_Parto(index, 'Sentada', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="column">
                                        <div className="">
                                            <label>PesoAnterior</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                // value={pesoAnterior}
                                                // onChange={(e) => setPesoAnterior(e.target.value)}
                                                placeholder="(Kg)"
                                            />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="">
                                            <label>PesoAnterior</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                // value={pesoAnterior}
                                                // onChange={(e) => setPesoAnterior(e.target.value)}
                                                placeholder="(Kg)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>







                        <button
                            type="submit"
                            style={{ background: loader ? "#ccc" : "rgb(2, 2, 110)" }}
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ThirdModuleScreen;