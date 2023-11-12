import { useState, useEffect } from "react";
import { db } from "../services/FirebaseServices";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/thirdModuleStyle.css";
import Switch from "react-switch";

const ThirdModuleScreen = ({ onSignOut }) => {
    const [, setLocation] = useLocation();
    const cachedId = localStorage.getItem("cachedId");
    const [, setLoader] = useState(false); // Estado para la fecha
    const [parto, setparto] = useState("");
    const [Parto, setPartoAborto] = useState([
        {
            referida: "",
            carnet: "",
            consultas_Prenatales_Totales: "",
            lugar_Parto: "",
            edad_Gestacional: "",
            Hospitalizado_En_Embarazo: "",
            corticloide_Antenatal: "",
            inicio: "",
            presentacion_Situacion: "",
            tamano_Fetal_Acorde: "",
            acompanante: "",
        },
    ]);

    const [RoturaMembrana, setRoturaMembrana] = useState([
        {
            rotura_Membrana_AnteParto: "",
            fecha: "",
            menor_37_Semanas: "",
            mayor_18_Semanas: "",
            temperatura_Mayor_a_38_Grado: "",
            tarv: "",
        },
    ]);
    const [PruebasTDP, setPruebasTDP] = useState([
        {
            sifilis: "Sifilis",
            negativo: false,
            positivo: false,
            nr: false,
            nc: false,
        },
        {
            vih: "VIH",
            negativo: false,
            positivo: false,
            nr: false,
            nc: false,
        },
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
            Intra_Hosp: "",
            Extra_Hosp: "",
            Multiple: "",
            Terminacion: "",
            Posicion_Parto: "",
            Epiciotomia: "",
            Desgarro: "",
            Ligadura_De_Cordon: "",
        },
    ]);
    const [Cumplimiento_Del_MATEPE, setCumplimiento_Del_MATEPE] = useState([
        {
            Oxitosina_PrealumBR: false,
            Pinzamiendo_de_Cordon: false,
            Traccion_De_Cordon: false,
            Masaje_uterino: false,
        },
    ]);

    const [MedicacionRecibida, setMedicacionRecibida] = useState([
        {
            ocitocicos_TDP: false,
            antibiotico: false,
            anagelsia: false,
            anest_Local: false,
            anest_Region: false,
            anest_Gral: false,
            transf: false,
            Preclam: false,
            eclam: false,
        },
    ]);

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
        },
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
        },
    ]);

    const [Hemorragias, setHemorragias] = useState([
        {
            Hemorragias: "Hemorragias",
            PrimerTrimestre: false,
            SegundoTrimestre: false,
            TercerTrimestre: false,
            PosParto: false,
            InfeccionPuerperal: false,
        },
    ]);

    const handlePartoAborto = (index, field, value) => {
        const updatedPartoAborto = [...Parto];
        updatedPartoAborto[index][field] = value;
        setPartoAborto(updatedPartoAborto);
    };
    const handleRoturaMembrana = (index, field, value) => {
        const updatedRoturaMembrana = [...RoturaMembrana];
        updatedRoturaMembrana[index][field] = value;
        setRoturaMembrana(updatedRoturaMembrana);
    };
    const handlePruebasTDP = (index, field, Newvalue) => {
        const updatedPruebasTDP = [...PruebasTDP];
        updatedPruebasTDP[index][field] = Newvalue;
        setPruebasTDP(updatedPruebasTDP);
    };
    const handleNacimiento = (index, field, value) => {
        const updatedNacimiento = [...Nacimiento];
        updatedNacimiento[index][field] = value;
        setNacimiento(updatedNacimiento);
    };
    const handleCumplimiento_Del_MATEPE = (index, field, value) => {
        const updatedCumplimiento_Del_MATEPE = [...Cumplimiento_Del_MATEPE];
        updatedCumplimiento_Del_MATEPE[index][field] = value;
        setCumplimiento_Del_MATEPE(updatedCumplimiento_Del_MATEPE);
    };

    const handleMedicacionRecibida = (index, field, newValue) => {
        const updatedMedicacionRecibida = [...MedicacionRecibida];
        updatedMedicacionRecibida[index][field] = newValue ? true : false;
        setMedicacionRecibida(updatedMedicacionRecibida);
    };

    const handleEnfermedades = (index, field, newValue) => {
        const updatedEnfermedades = [...EnfermedadesData];
        updatedEnfermedades[index][field] = newValue ? true : false;
        setEnfermedades(updatedEnfermedades);
    };

    const handleHemorragias = (index, field, newValue) => {
        const updatedHemorragias = [...Hemorragias];
        updatedHemorragias[index][field] = newValue ? true : false;
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
                            const {
                                Parto,
                                parto,
                                RoturaMembrana,
                                PruebasTDP,
                                Nacimiento,
                                Cumplimiento_Del_MATEPE,
                                MedicacionRecibida,
                                DetallesPartoGrama,
                                EnfermedadesData,
                                Hemorragias,
                            } = data.ModuloPartoAborto;
                            // Establecer los datos recuperados en el estado
                            setPartoAborto(Parto);
                            setparto(parto);
                            setRoturaMembrana(RoturaMembrana);
                            setPruebasTDP(PruebasTDP);
                            setNacimiento(Nacimiento);
                            setCumplimiento_Del_MATEPE(Cumplimiento_Del_MATEPE);
                            setMedicacionRecibida(MedicacionRecibida);
                            setDetallesPartoGrama(DetallesPartoGrama);
                            setEnfermedades(EnfermedadesData);
                            setHemorragias(Hemorragias);
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
                const docRef = db.collection("cartilla").doc(cachedId);
                const doc = await docRef.get();

                if (doc.exists) {
                    // Obtén los datos actuales del documento
                    const data = doc.data();
                    console.log(data);
                    // Actualiza los campos que desees en el subdocumento "primer modulo"
                    data.ModuloPartoAborto = {

                        Parto: Parto,
                        parto: parto,
                        RoturaMembrana,
                        PruebasTDP: PruebasTDP,
                        Nacimiento: Nacimiento,
                        Cumplimiento_Del_MATEPE: Cumplimiento_Del_MATEPE,
                        MedicacionRecibida: MedicacionRecibida,
                        DetallesPartoGrama: DetallesPartoGrama,
                        EnfermedadesData: EnfermedadesData,
                        Hemorragias: Hemorragias,
                    };

                    // Guarda los datos actualizados en el documento
                    await docRef.set(data);

                    console.log("Datos actualizados en Firebase con éxito.");
                    setparto("");

                    setPartoAborto([
                        {

                            referida: "",
                            carnet: "",
                            consultas_Prenatales_Totales: "",
                            lugar_Parto: "",
                            edad_Gestacional: "",
                            Hospitalizado_En_Embarazo: false,
                            corticloide_Antenatal: "",
                            inicio: "",
                            presentacion_Situacion: "",
                            tamano_Fetal_Acorde: false,
                            acompanante: "",
                        },
                    ]);

                    setRoturaMembrana([
                        {
                            rotura_Membrana_AnteParto: false,
                            fecha: "",
                            menor_37_Semanas: false,
                            mayor_18_Semanas: false,
                            temperatura_Mayor_a_38_Grado: false,
                            tarv: "",
                        },
                    ]);
                    setPruebasTDP([
                        {
                            sifilis: "Sifilis",
                            negativo: false,
                            positivo: false,
                            nr: false,
                            nc: false,
                        },
                        {
                            vih: "VIH",
                            negativo: false,
                            positivo: false,
                            nr: false,
                            nc: false,
                        },
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
                            Intra_Hosp: "",
                            Extra_Hosp: "",
                            Multiple: "",
                            Terminacion: "",
                            Posicion_Parto: "",
                            Epiciotomia: "",
                            Desgarro: "",
                            Ligadura_De_Cordon: "",
                        },
                    ]);
                    setCumplimiento_Del_MATEPE([
                        {
                            Oxitosina_PrealumBR: false,
                            Pinzamiendo_de_Cordon: false,
                            Traccion_De_Cordon: false,
                            Masaje_uterino: false,
                        },
                    ]);

                    setMedicacionRecibida([
                        {
                            ocitocicos_TDP: false,
                            antibiotico: false,
                            anagelsia: "",
                            anest_Local: false,
                            anest_Region: false,
                            anest_Gral: false,
                            transf: false,
                            Preclam: false,
                            eclam: false,
                        },
                    ]);

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
                        },
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
                            OtraCondicionGrave: false,
                        },
                    ]);
                    setHemorragias([
                        {
                            Hemorragias: "Hemorragias",
                            PrimerTrimestre: false,
                            SegundoTrimestre: false,
                            TercerTrimestre: false,
                            PosParto: false,
                            InfeccionPuerperal: false,
                        },
                    ]);
                } else {
                    console.error("El documento no existe.");
                }
            } catch (error) {
                console.error("Error al actualizar datos en Firebase:", error);
            }
        } else {
            console.error("No se pudo encontrar un ID válido en localStorage.");
        }
    };
    const handleLogout = () => {
        onSignOut();
        setLocation("/login");
    };

    const handleButtonClick = () => {
        setLocation("/modules");
    };

    return (
        <div>
            <NavBarComponent
                onSignOut={handleLogout}
                showCloseExpedienteButton={false}
            />

            <div className="form-container">
                <h1 className="nombre">Modulo Parto - Aborto 🤳</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="table-container">
                        {/* PartoAborto */}

                        {Parto.map((detalle, index) => (
                            <div key={index}>
                                <div className="cita-form">
                                    <div className="form-group">
                                        <label>Parto o Aborto</label>
                                        <select
                                            className="select"
                                            value={parto}
                                            onChange={(e) => setparto(e.target.value)}
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Parto">Parto</option>
                                            <option value="Aborto">Aborto</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Referida</label>
                                        <select
                                            className="select"
                                            value={detalle.referida}
                                            onChange={(e) =>
                                                handlePartoAborto(index, "referida", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Casa_Materna">Casa Materna</option>
                                            <option value="Plan_Parto">Plan Parto</option>
                                            <option value="Domiciliar">Domiciliar</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Lugar de parto</label>
                                        <select
                                            className="select"
                                            value={detalle.lugar_Parto}
                                            onChange={(e) =>
                                                handlePartoAborto(index, "lugar_Parto", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Casa_Materna">Casa Materna</option>
                                            <option value="Plan_Parto">Plan Parto</option>
                                            <option value="Domiciliar">Domiciliar</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Edad Gestacional</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.edad_Gestacional}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "edad_Gestacional",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Tienes Carnet</label>
                                        <select
                                            className="select"
                                            value={detalle.carnet}
                                            onChange={(e) =>
                                                handlePartoAborto(index, "carnet", e.target.value)
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Hospitalizado en embarazo</label>
                                        <select
                                            className="select"
                                            value={detalle.Hospitalizado_En_Embarazo.toString()}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "Hospitalizado_En_Embarazo",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Corticloide Antenatal</label>
                                        <select
                                            className="select"
                                            value={detalle.corticloide_Antenatal}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "corticloide_Antenatal",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>Opciones</option>
                                            <option value="Completo">Completo</option>
                                            <option value="Incompleto">Incompleto</option>
                                            <option value="Ninguna">Ninguna</option>
                                            <option value="N/C">N/C</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Inicio</label>
                                        <select
                                            className="select"
                                            value={detalle.inicio}
                                            onChange={(e) =>
                                                handlePartoAborto(index, "inicio", e.target.value)
                                            }
                                        >
                                            <option>Opciones</option>
                                            <option value="Expontaneo">Expontaneo</option>
                                            <option value="Inducido">Inducido</option>
                                            <option value="Cesar_Elect">Cesar.Elect</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Presentación Situación</label>
                                        <select
                                            className="select"
                                            value={detalle.presentacion_Situacion}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "presentacion_Situacion",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>Opciones</option>
                                            <option value="Cefálica">Cefálica</option>
                                            <option value="Pelviana">Pelviana</option>
                                            <option value="Transversa">Transversa</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Tamaño Fetal Acorde</label>
                                        <select
                                            className="select"
                                            value={detalle.tamano_Fetal_Acorde}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "tamano_Fetal_Acorde",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Acompañante</label>
                                        <select
                                            className="select"
                                            value={detalle.acompanante}
                                            onChange={(e) =>
                                                handlePartoAborto(index, "acompanante", e.target.value)
                                            }
                                        >
                                            <option>Opciones</option>
                                            <option value="Pareja">Pareja</option>
                                            <option value="Familiar">Familiar</option>
                                            <option value="Otro">Otro</option>
                                            <option value="Ninguno">Ninguno</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Consultas Prenatales</label>
                                        <input
                                            className="tipoNumber"
                                            type="number"
                                            value={detalle.consultas_Prenatales_Totales}
                                            onChange={(e) =>
                                                handlePartoAborto(
                                                    index,
                                                    "consultas_Prenatales_Totales",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Rotura Membrana */}
                        <h2>Rotura Membrana Anteparto</h2>
                        {RoturaMembrana.map((detalle, index) => (
                            <div key={index}>
                                <div className="cita-form">
                                    <div className="form-group">
                                        <label>Rotura Membrana Anteparto</label>
                                        <select
                                            className="select"
                                            value={detalle.rotura_Membrana_AnteParto}
                                            onChange={(e) =>
                                                handleRoturaMembrana(
                                                    index,
                                                    "rotura_Membrana_AnteParto",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input
                                            className="tipoNumber"
                                            type="date"
                                            value={detalle.fecha}
                                            onChange={(e) =>
                                                handleRoturaMembrana(index, "fecha", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Menor a 37 Semanas</label>
                                        <select
                                            className="select"
                                            value={detalle.menor_37_Semanas}
                                            onChange={(e) =>
                                                handleRoturaMembrana(
                                                    index,
                                                    "menor_37_Semanas",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Mayor o igual a 18 Semanas</label>
                                        <select
                                            className="select"
                                            value={detalle.mayor_18_Semanas}
                                            onChange={(e) =>
                                                handleRoturaMembrana(
                                                    index,
                                                    "mayor_18_Semanas",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Temperatura Mayor a 38 Grado</label>
                                        <select
                                            className="select"
                                            value={detalle.temperatura_Mayor_a_38_Grado}
                                            onChange={(e) =>
                                                handleRoturaMembrana(
                                                    index,
                                                    "temperatura_Mayor_a_38_Grado",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>TARV</label>
                                        <select
                                            className="select"
                                            value={detalle.tarv}
                                            onChange={(e) =>
                                                handleRoturaMembrana(index, "tarv", e.target.value)
                                            }
                                        >
                                            <option value="">Opciones</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                            <option value="N/C">N/c</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Pruebas en TDP */}
                        <h2>Prueba en TDP</h2>
                        {PruebasTDP.map((trimestre, index) => (
                            <div key={index}>
                                <div className="formularioFourthModule">
                                    <div className="formularioFourthChildren">
                                        <label>{trimestre.sifilis || trimestre.vih}</label>
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor={`negativo${index}`}>-</label>
                                        <Switch
                                            id={`negativo${index}`}
                                            checked={trimestre.negativo === true}
                                            onChange={(newValue) =>
                                                handlePruebasTDP(index, "negativo", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor={`positivo${index}`}>+</label>
                                        <Switch
                                            id={`positivo${index}`}
                                            checked={trimestre.positivo === true}
                                            onChange={(newValue) =>
                                                handlePruebasTDP(index, "positivo", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor={`nr${index}`}>N/R</label>
                                        <Switch
                                            id={`nr${index}`}
                                            checked={trimestre.nr === true}
                                            onChange={(newValue) =>
                                                handlePruebasTDP(index, "nr", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor={`nc${index}`}>N/C</label>
                                        <Switch
                                            id={`nc${index}`}
                                            checked={trimestre.nc === true}
                                            onChange={(newValue) =>
                                                handlePruebasTDP(index, "nc", newValue)
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
                                            className="select"
                                            value={detalle.Vivo}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Vivo", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Vivo">Si</option>
                                            <option value="Muerto">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Muerto</label>
                                        <select
                                            className="select"
                                            value={detalle.Muerto}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Muerto", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Muerto">Si</option>
                                            <option value="Vivo">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>AnteParto</label>
                                        <select
                                            className="select"
                                            value={detalle.AnteParto}
                                            onChange={(e) =>
                                                handleNacimiento(index, "AnteParto", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Parto</label>
                                        <select
                                            className="select"
                                            value={detalle.Parto}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Parto", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>IgnoraMomento</label>
                                        <select
                                            className="select"
                                            value={detalle.IgnoraMomento}
                                            onChange={(e) =>
                                                handleNacimiento(index, "IgnoraMomento", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="cita-form">
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input
                                            className="tipoNumber"
                                            type="Date"
                                            value={detalle.Fecha}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Fecha", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Instra Hosp</label>
                                        <select
                                            className="select"
                                            value={detalle.Intra_Hosp}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Intra_Hosp", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Extra Hosp</label>
                                        <select
                                            className="select"
                                            value={detalle.Extra_Hosp}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Extra_Hosp", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Multiple</label>
                                        <select
                                            className="select"
                                            value={detalle.Multiple}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Multiple", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Terminacion</label>
                                        <select
                                            className="select"
                                            value={detalle.Terminacion}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Terminacion", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Espontaneo">Espontaneo</option>
                                            <option value="Cesaria">Cesaria</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="cita-form">
                                    <div className="form-group">
                                        <label>Posicion Parto</label>
                                        <select
                                            className="select"
                                            value={detalle.Posicion_Parto}
                                            onChange={(e) =>
                                                handleNacimiento(
                                                    index,
                                                    "Posicion_Parto",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Sentada">Sentada</option>
                                            <option value="Acostada">Acostada</option>
                                            <option value="Cunclillas">Cunclillas</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Epiciotomia</label>
                                        <select
                                            className="select"
                                            value={detalle.Epiciotomia}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Epiciotomia", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="No">No</option>
                                            <option value="Si">Si</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Desgarro</label>
                                        <select
                                            className="select"
                                            value={detalle.Desgarro}
                                            onChange={(e) =>
                                                handleNacimiento(index, "Desgarro", e.target.value)
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="No">No</option>
                                            <option value="Grado_1_a_4">Grado(1 a 4)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Ligadura de Cordon</label>
                                        <select
                                            className="select"
                                            value={detalle.Ligadura_De_Cordon}
                                            onChange={(e) =>
                                                handleNacimiento(
                                                    index,
                                                    "Ligadura_De_Cordon",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Menor a 1 Minuto">Menor A 1 Minuto</option>
                                            <option value="De 1 a 3 Minutos">De 1 a 3 Minutos</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Analizar Cumplimiento deL MATEP */}
                        <h2>Analizar Cumplimiento de MATEP</h2>
                        {Cumplimiento_Del_MATEPE.map((detalle, index) => (
                            <div key={index}>
                                <div className="cita-form">
                                    <div className="form-group">
                                        <label>Oxitosina PrealumBR</label>
                                        <Switch
                                            id={`Oxitosina_PrealumBR${index}`}
                                            checked={
                                                Cumplimiento_Del_MATEPE[index].Oxitosina_PrealumBR ===
                                                true
                                            }
                                            onChange={(newValue) =>
                                                handleCumplimiento_Del_MATEPE(
                                                    index,
                                                    "Oxitosina_PrealumBR",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pinzamiento De Cordon</label>
                                        <Switch
                                            id={`Pinzamiendo_de_Cordon${index}`}
                                            checked={
                                                Cumplimiento_Del_MATEPE[index].Pinzamiendo_de_Cordon ===
                                                true
                                            }
                                            onChange={(newValue) =>
                                                handleCumplimiento_Del_MATEPE(
                                                    index,
                                                    "Pinzamiendo_de_Cordon",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Traccion De Cordon</label>
                                        <Switch
                                            id={`Traccion_De_Cordon${index}`}
                                            checked={
                                                Cumplimiento_Del_MATEPE[index].Traccion_De_Cordon ===
                                                true
                                            }
                                            onChange={(newValue) =>
                                                handleCumplimiento_Del_MATEPE(
                                                    index,
                                                    "Traccion_De_Cordon",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Masaje Uterino</label>
                                        <Switch
                                            id={`Masaje_uterino${index}`}
                                            checked={
                                                Cumplimiento_Del_MATEPE[index].Masaje_uterino === true
                                            }
                                            onChange={(newValue) =>
                                                handleCumplimiento_Del_MATEPE(
                                                    index,
                                                    "Masaje_uterino",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="form-group"></div>
                                </div>
                            </div>
                        ))}

                        <h2>Medicacion Recibida</h2>
                        {MedicacionRecibida.map((item, index) => (
                            <div key={index}>
                                <div className="formularioFourthModule">
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Ocitocico en TDP</label>
                                        <Switch
                                            id={`ocitocicos_TDP${index}`}
                                            checked={item.ocitocicos_TDP === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(
                                                    index,
                                                    "ocitocicos_TDP",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Antibiotico</label>
                                        <Switch
                                            id={`antibiotico${index}`}
                                            checked={item.antibiotico === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "antibiotico", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Anagelsia</label>
                                        <Switch
                                            id={`anagelsia${index}`}
                                            checked={item.anagelsia === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "anagelsia", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Anest.Local</label>
                                        <Switch
                                            id={`anest_Local${index}`}
                                            checked={item.anest_Local === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "anest_Local", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Anest.Region</label>
                                        <Switch
                                            id={`anest_Region${index}`}
                                            checked={item.anest_Region === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(
                                                    index,
                                                    "anest_Region",
                                                    newValue
                                                )
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Anest.Gral</label>
                                        <Switch
                                            id={`anest_Gral${index}`}
                                            checked={item.anest_Gral === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "anest_Gral", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Transf</label>
                                        <Switch
                                            id={`transf${index}`}
                                            checked={item.transf === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "transf", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>

                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Preclam</label>
                                        <Switch
                                            id={`Preclam${index}`}
                                            checked={item.Preclam === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "Preclam", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                    <div className="formularioFourthChildren">
                                        <label htmlFor="multi-last-name">Eclam</label>
                                        <Switch
                                            id={`eclam${index}`}
                                            checked={item.eclam === true}
                                            onChange={(newValue) =>
                                                handleMedicacionRecibida(index, "eclam", newValue)
                                            }
                                            onColor="#eff303" // Color cuando está en posición "Sí"
                                            offColor="#888888" // Color cuando está en posición "No"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Otro formulario */}
                        <h1>detalle partograma</h1>
                        {DetallesPartoGrama.map((detalle, index) => (
                            <div key={index}>
                                <div className="cita-form">

                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input
                                            className="text"
                                            type="date"
                                            value={detalle.Fecha}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(index, "Fecha", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>PosicionDelaMadre</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.PosicionDelaMadre}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "PosicionDelaMadre",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>PA</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.PA}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(index, "PA", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pulso</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.Pulso}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(index, "Pulso", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Control_10</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.Control_10}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "Control_10",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="cita-form">


                                    <div className="form-group">
                                        <label>Dilatacion</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.Dilatacion}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "Dilatacion",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>AlturaPresente</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.AlturaPresente}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "AlturaPresente",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>VariedadPosic</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.VariedadPosic}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "VariedadPosic",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Meconio</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.Meconio}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "Meconio",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>FCF_Dips</label>
                                        <input
                                            className="text"
                                            type="text"
                                            value={detalle.FCF_Dips}
                                            onChange={(e) =>
                                                handleDetallesPartoGrama(
                                                    index,
                                                    "FCF_Dips",
                                                    e.target.value
                                                )
                                            }
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
                                            checked={
                                                EnfermedadesData[index].HTAInducidaEmbarazo === true
                                            }
                                            onChange={(newValue) =>
                                                handleEnfermedades(
                                                    index,
                                                    "HTAInducidaEmbarazo",
                                                    newValue
                                                )
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
                                            checked={
                                                EnfermedadesData[index].AmenazaPartoPreter === true
                                            }
                                            onChange={(newValue) =>
                                                handleEnfermedades(
                                                    index,
                                                    "AmenazaPartoPreter",
                                                    newValue
                                                )
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
                                            checked={
                                                EnfermedadesData[index].RoturaPremDeMembranas === true
                                            }
                                            onChange={(newValue) =>
                                                handleEnfermedades(
                                                    index,
                                                    "RoturaPremDeMembranas",
                                                    newValue
                                                )
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
                                            checked={
                                                EnfermedadesData[index].OtraCondicionGrave === true
                                            }
                                            onChange={(newValue) =>
                                                handleEnfermedades(
                                                    index,
                                                    "OtraCondicionGrave",
                                                    newValue
                                                )
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
                                            checked={Hemorragias[index].PrimerTrimestre === true}
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
                                            checked={Hemorragias[index].SegundoTrimestre === true}
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
                                            checked={Hemorragias[index].TercerTrimestre === true}
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
                                            checked={Hemorragias[index].PosParto === true}
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
                                            checked={Hemorragias[index].InfeccionPuerperal === true}
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
                    </div>

                    <div className="containerButtonFourth">
                        <button className="ButtonEnviarFourth" type="submit">
                            Guardar
                        </button>
                        <button
                            className="ButtonCancelFourth"
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ThirdModuleScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};
export default ThirdModuleScreen;
