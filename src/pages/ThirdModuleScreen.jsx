import { useState,useEffect } from 'react';
import { db } from '../services/FirebaseServices';
import PropTypes from "prop-types"
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import '../styles/thirdModuleStyle.css';
import Switch from 'react-switch';



const ThirdModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem('cachedId');
    const [campo1, setCampo1] = useState('');
    const [campo2, setCampo2] = useState('');



    const [parto, setParto] = useState("");
    const [message, setMessage] = useState("");
    const [, setLoader] = useState(false);
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
            HTAPrevia: false,
            HTAInducidaEmbarazo: false,
            PreeDampsia: false,
            Eclampsia: false,
            CardioPatia: false,
            Nefropatia: false,
            Diabetes: false,
            InfecOvular: false,
            InfeUrinaria: false,
            AmenazaPartoPreter: false,
            RCIU: false,
            RoturaPremDeMembranas: false,
            Anemia: false,
            OtraCondicionGrave: false, 

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

    const handleEnfermedades = (index, field, newValue) => {
        const updatedEnfermedades = [...EnfermedadesData];
        updatedEnfermedades[index][field] = newValue ? true : false;
        setEnfermedades(updatedEnfermedades); 
    };


    const handleHemorragias = (index, field, newValue) => {
        const updatedHemorragias = [...Hemorragias];
        updatedHemorragias[index][field] = newValue ? "si" : "no";
        setHemorragias(updatedHemorragias);
    };
    const handleDetallesPartoGrama = (index, field, value) => {
        const updatedDetallesPartoGrama = [...DetallesPartoGrama];
        updatedDetallesPartoGrama[index][field] = value;
        setDetallesPartoGrama(updatedDetallesPartoGrama);
    };
    // UseEffect para cargar los datos desde Firebase al montar el componente
    useEffect(() => {
        if (cachedId) {
            try {
                const docRef = db.collection("cartilla").doc(cachedId);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.ModuloPartoAborto) {
                            const { EnfermedadesData,Hemorragias
                        ,Nacimiento,DetallesPartoGrama,parto,lugardeparto,Corticoides,carnet
                        ,inicio,PresentacioSituacion,edad,edadgestacional,
                        diagestacional, TamañoFetalAcorde,Hospitalizado_en_Enbarazo,
                        DiasHospitalizado,acompañante,consulta} = data.ModuloPartoAborto;
                            // Establecer los datos recuperados en el estado
                            setEnfermedades(EnfermedadesData);
                            setHemorragias(Hemorragias);
                            setNacimiento(Nacimiento);
                            setDetallesPartoGrama(DetallesPartoGrama);
                            setCorticoides(Corticoides);
                            setPresentacioSituacion(PresentacioSituacion);
                            setedad(edad);
                            setedadgestacional(edadgestacional);
                            setdiagestacional(diagestacional);
                            setInicio(inicio);
                            setLugardeparto(lugardeparto);
                            setParto(parto);
                            setCarnet(carnet);
                            setTamañoFetalAcorde(TamañoFetalAcorde);
                            setHospitalizado_en_Enbarazo(Hospitalizado_en_Enbarazo);
                            setDiasHospitalizado(DiasHospitalizado);
                            setporECO(porECO);
                            setacompañante(acompañante);
                            setConsulta(consulta);
                          
                            
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
        setLoader(true);
        if (cachedId) {
            try {
                const docRef = db.collection('cartilla').doc(cachedId);
                const doc = await docRef.get();

                if (doc.exists) {

                    // Obtén los datos actuales del documento
                    const data = doc.data();

                    // Actualiza los campos que desees en el subdocumento "primer modulo"
                    data.ModuloPartoAborto = {
                        campo1: campo1,
                        campo2: campo2,
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
                    };

                    // Guarda los datos actualizados en el documento
                    await docRef.set(data);

                    console.log('Datos actualizados en Firebase con éxito.');
                    setCampo1('');
                    setCampo2('');
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
                            HTAPrevia: false,
                            HTAInducidaEmbarazo: false,
                            PreeDampsia: false,
                            Eclampsia: false,
                            CardioPatia: false,
                            Nefropatia: false,
                            Diabetes: false,
                            InfecOvular: false,
                            InfeUrinaria: false,
                            AmenazaPartoPreter: false,
                            RCIU: false,
                            RoturaPremDeMembranas: false,
                            Anemia: false,
                            OtraCondicionGrave:false,

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


                } else {
                    console.error('El documento no existe.');
                }
            } catch (error) {
                console.error('Error al actualizar datos en Firebase:', error);
            }
        } else {
            console.error('No se pudo encontrar un ID válido en localStorage.');
        }
    };
    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    }

    const handleButtonClick = () => {
        setLocation("/modules");
    }

    return (
        <div>

            <NavBarComponent onSignOut={handleLogout} showCloseExpedienteButton={false} />


            <div className="form-container"> <h1 className="nombre">Modulo Parto - Aborto 🤳</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Agregar nueva cita</h2>
                    <div className="table-container">
                        <div className="cita-form">
                            <div className="form-group">
                                <label>Parto o Aborto</label>
                                <select
                                    className='select'
                                    value={parto}
                                    onChange={(e) => setParto(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Parto">Parto</option>
                                    <option value="Aborto">Aborto</option>

                                </select>
                            </div><div className="form-group">
                                <label>Consultas Prenatales Totales</label>
                                <input
                                    className='text'
                                    type="number"
                                    placeholder="Numero de consultas"
                                    value={consulta}
                                    onChange={(e) => setConsulta(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Lugar de Parto</label>
                                <select
                                    className='select'
                                    value={lugardeparto}
                                    onChange={(e) => setLugardeparto(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Institucional">Institucional</option>
                                    <option value="Domiciliar">Domiciliar</option>
                                    <option value="Otro">Otro</option>s
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Corticoides Antenatales</label>
                                <select
                                    className='select'
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
                            <div className="form-group">
                                <label>Tienes carnet</label>
                                <select
                                    className='select'
                                    value={carnet}
                                    onChange={(e) => setCarnet(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Inicio</label>
                                <select
                                    className='select'

                                    value={inicio}
                                    onChange={(e) => setInicio(Array.from(e.target.selectedOptions, option => option.value))}
                                >
                                    <option value="Expontaneo">Expontaneo</option>
                                    <option value="Inducido">Inducido</option>
                                    <option value="cesar.Elec">cesar.Elec</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Presentación Situación</label>
                                <select
                                    className='select'

                                    value={PresentacioSituacion}
                                    onChange={(e) => setPresentacioSituacion(Array.from(e.target.selectedOptions, option => option.value))}
                                >
                                    <option value="Cefática">Cefática</option>
                                    <option value="Pélvico">Pélvico</option>
                                    <option value="Transversa">Transversa</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ructura prematura de menbrana</label>
                                <select
                                    className='select'

                                    value={edad}
                                    onChange={(e) => setedad(Array.from(e.target.selectedOptions, option => option.value))}
                                >
                                    <option value="SI">Si</option>
                                    <option value="No">No</option>
                                </select>

                            </div>
                        </div>
                        <div className="cita-form">

                            <div className="form-group">
                                <label>Edad Gestacional Al Parto</label>
                                <input
                                    className='text'
                                    type="number"
                                    placeholder="Semanas"
                                    value={edadgestacional}
                                    onChange={(e) => setedadgestacional(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Dia Gestacional</label>
                                <input
                                    className='text'
                                    type="number"
                                    placeholder="Dias"
                                    value={diagestacional}
                                    onChange={(e) => setdiagestacional(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tamaño Fetal Acorde</label>
                                <select
                                    className='select'
                                    value={TamañoFetalAcorde}
                                    onChange={(e) => setTamañoFetalAcorde(e.target.value)}

                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Hospitalizado en Enbarazo</label>
                                <select
                                    className='select'

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
                                            className='text'
                                            type="text"
                                            value={DiasHospitalizado}
                                            onChange={(e) => setDiasHospitalizado(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="cita-form">

                            <div className="form-group">
                                
                                <label
                                    className={`opcion ${setporFUM === "Por FUM" ? "seleccionado" : ""}`}
                                    onClick={() => setporFUM("Por FUM")}
                                >
                                    <input
                                        className='text'
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
                            <div className="form-group">
                                <label

                                    className={`opcion ${setporECO === "Por ECO" ? "seleccionado" : ""}`}
                                    onClick={() => setporECO("Por ECO")}
                                >
                                    <input
                                        className='text'
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
                            <div className="form-group">
                                <label>Acompañante</label>
                                <select
                                    className='select'
                                    value={acompañante}
                                    onChange={(e) => setacompañante(e.target.value)}

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
                    {/* Otro formulario */}
                    <h1>detalle partograma</h1>
                    {DetallesPartoGrama.map((detalle, index) => (
                        <div key={index}>
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>ID</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.ID}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'ID', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input
                                        className='text'
                                        type="date"
                                        value={detalle.Fecha}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'Fecha', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>PosicionDelaMadre</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.PosicionDelaMadre}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'PosicionDelaMadre', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>PA</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.PA}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'PA', e.target.value)}
                                    />

                                </div>
                            </div>
                            <div className="cita-form">
                                <div className="form-group">
                                    < label>Pulso</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.Pulso}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'Pulso', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>Control_10</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.Control_10}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'Control_10', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>Dilatacion</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.Dilatacion}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'Dilatacion', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>AlturaPresente</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.AlturaPresente}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'AlturaPresente', e.target.value)}
                                    />

                                </div>

                            </div>
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>VariedadPosic</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.VariedadPosic}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'VariedadPosic', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>Meconio</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.Meconio}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'Meconio', e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label>FCF_Dips</label>
                                    <input
                                        className='text'
                                        type="text"
                                        value={detalle.FCF_Dips}
                                        onChange={(e) => handleDetallesPartoGrama(index, 'FCF_Dips', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    ))}

                    {/* formulario de enfermedades  */}
                    <h1>Enfermedades</h1>
                    {EnfermedadesData.map((Enfermedades, index) => (
                        <div key={index}>
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>HTAPrevia</label>
                                    <Switch
                                        id={`PrimerTrimestre${index}`}
                                        checked={EnfermedadesData[index].HTAPrevia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "HTAPrevia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <label>HTAInducidaEmbarazo</label>
                                    <Switch
                                        id={`HTAInducidaEmbarazo${index}`}
                                        checked={EnfermedadesData[index].HTAInducidaEmbarazo === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "HTAInducidaEmbarazo", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>PreeDampsia</label>
                                    <Switch
                                        id={`PreeDampsia${index}`}
                                        checked={EnfermedadesData[index].PreeDampsia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "PreeDampsia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Eclampsia</label>
                                    <Switch
                                        id={`Eclampsia${index}`}
                                        checked={EnfermedadesData[index].Eclampsia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "Eclampsia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CardioPatia</label>
                                    <Switch
                                        id={`CardioPatia${index}`}
                                        checked={EnfermedadesData[index].CardioPatia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "CardioPatia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nefropatia</label>
                                    <Switch
                                        id={`Nefropatia${index}`}
                                        checked={EnfermedadesData[index].Nefropatia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "Nefropatia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Diabetes</label>
                                    <Switch
                                        id={`Diabetes${index}`}
                                        checked={EnfermedadesData[index].Diabetes === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "Diabetes", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>InfecOvular</label>
                                    <Switch
                                        id={`InfecOvular${index}`}
                                        checked={EnfermedadesData[index].InfecOvular === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "InfecOvular", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>InfeUrinaria</label>
                                    <Switch
                                        id={`InfeUrinaria${index}`}
                                        checked={EnfermedadesData[index].InfeUrinaria === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "InfeUrinaria", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>AmenazaPartoPreter</label>
                                    <Switch
                                        id={`AmenazaPartoPreter${index}`}
                                        checked={EnfermedadesData[index].AmenazaPartoPreter === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "AmenazaPartoPreter", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>RCIU</label>
                                    <Switch
                                        id={`RCIU${index}`}
                                        checked={EnfermedadesData[index].RCIU === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "RCIU", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>RoturaPremDeMembranas</label>
                                    <Switch
                                        id={`RoturaPremDeMembranas${index}`}
                                        checked={EnfermedadesData[index].RoturaPremDeMembranas === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "RoturaPremDeMembranas", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Anemia</label>
                                    <Switch
                                        id={`Anemia${index}`}
                                        checked={EnfermedadesData[index].Anemia === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "Anemia", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>OtraCondicionGrave</label>
                                    <Switch
                                        id={`OtraCondicionGrave${index}`}
                                        checked={EnfermedadesData[index].OtraCondicionGrave === true}
                                        onChange={(newValue) =>
                                            handleEnfermedades(index, "OtraCondicionGrave", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>


                            </div>


                        </div>
                    ))}
                    {/* otro formulario */}
                    <h1>Hemorragias</h1>
                    {Hemorragias.map((item, index) => (
                        <div key={index}>

                            <div className="cita-form">

                                <div className="form-group">
                                    <label>PrimerTrimestre</label>
                                    <Switch
                                        id={`PrimerTrimestre${index}`}
                                        checked={Hemorragias[index].PrimerTrimestre === "si"}
                                        onChange={(newValue) =>
                                            handleHemorragias(index, "PrimerTrimestre", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>SegundoTrimestre</label>
                                    <Switch
                                        id={`SegundoTrimestre${index}`}
                                        checked={Hemorragias[index].SegundoTrimestre === "si"}
                                        onChange={(newValue) =>
                                            handleHemorragias(index, "SegundoTrimestre", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>TercerTrimestre</label>
                                    <Switch
                                        id={`TercerTrimestre${index}`}
                                        checked={Hemorragias[index].TercerTrimestre === "si"}
                                        onChange={(newValue) =>
                                            handleHemorragias(index, "TercerTrimestre", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>PosParto</label>
                                    <Switch
                                        id={`PosParto${index}`}
                                        checked={Hemorragias[index].PosParto === "si"}
                                        onChange={(newValue) =>
                                            handleHemorragias(index, "PosParto", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>InfeccionPuerperal</label>
                                    <Switch
                                        id={`InfeccionPuerperal${index}`}
                                        checked={Hemorragias[index].InfeccionPuerperal === "si"}
                                        onChange={(newValue) =>
                                            handleHemorragias(index, "InfeccionPuerperal", newValue)
                                        }
                                        onColor="#eff303" // Color cuando está en posición "Sí"
                                        offColor="#888888" // Color cuando está en posición "No"
                                    />
                                </div>

                            </div>

                        </div>
                    ))}
                    {/* otra tabla */}
                    <h1>Nacimientos</h1>
                    {Nacimiento.map((detalle, index) => (
                        <div key={index}>
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>Vivo</label>
                                    <select
                                        className='select'
                                        value={detalle.Vivo}
                                        onChange={(e) => handleNacimiento(index, 'Vivo', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Vivo">Si</option>
                                        <option value="Muerto">No</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>Muerto</label>
                                    <select
                                        className='select'
                                        value={detalle.Muerto}
                                        onChange={(e) => handleNacimiento(index, 'Muerto', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Muerto">Si</option>
                                        <option value="Vivo">No</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>AnteParto</label>
                                    <select
                                        className='select'
                                        value={detalle.AnteParto}
                                        onChange={(e) => handleNacimiento(index, 'AnteParto', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>Parto</label>
                                    <select
                                        className='select'
                                        value={detalle.Parto}
                                        onChange={(e) => handleNacimiento(index, 'Parto', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                            </div>
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>IgnoraMomento</label>
                                    <select
                                        className='select'
                                        value={detalle.IgnoraMomento}
                                        onChange={(e) => handleNacimiento(index, 'IgnoraMomento', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input
                                        className='text'
                                        type="Date"
                                        value={detalle.FCF_Dips}
                                        onChange={(e) => handleNacimiento(index, 'Fecha', e.target.value)}
                                    />

                                </div>

                            </div>

                        </div>
                    ))}
                    {/* tabla Nacimiento */}
                    <h1>Nacimiento</h1>
                    {Posicion_Parto.map((detalle, index) => (
                        <div key={index} >
                            <div className="cita-form">
                                <div className="form-group">
                                    <label>Nacimiento</label>
                                    <select
                                        className='select'
                                        value={detalle.Solicitada_Por_Usuaria}
                                        onChange={(e) =>
                                            handlePosicion_Parto(index, 'Solicitada_Por_Usuaria', e.target.value)
                                        }
                                    >
                                        <option value="">Solicitada por la Usuaria</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    {detalle.Solicitada_Por_Usuaria === 'Si' && (
                                        <tr>

                                            <td y >
                                                {/* Aquí coloca los campos adicionales que deseas mostrar */}
                                                <label>Acostada</label>
                                                <input
                                                    className='text'
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
        // Informar al componente padre del nuevo estado
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

ThirdModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
}
export default ThirdModuleScreen;
