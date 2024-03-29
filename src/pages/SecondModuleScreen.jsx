import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { useLocation } from "wouter";
import { Timestamp } from 'firebase/firestore';
import { db } from "../services/FirebaseServices";
import NavBarComponent from "../components/NavbarComponent";
import CalendarComponent from "../components/CalendarComponent";
import "../styles/secondModuleStyle.css";

const SecondModuleScreen = ({ onSignOut }) => {
  const [, setLoader] = useState(false);
  const cachedId = localStorage.getItem("cachedId");
  const [, setLocation] = useLocation();
  const [pesoAnterior, setPesoAnterior] = useState("");
  const [talla, setTalla] = useState("");
  const [imc, setIMC] = useState("");
  const [DateFUM, setDateFUM] = useState("");
  const [DateFPP, setDateFPP] = useState("");
  const [selectedOptionECO, setSelectedOptionECO] = useState("");
  const [selectedOptionFUM, setSelectedOptionFUM] = useState("");

  //Para ver el calendario.
  const [showCalendar, setShowCalendar] = useState(false);


  //Estado para almacenar o cargar los eventos
  const [eventos, setEventos] = useState([]);// Estado para almacenar los eventos

  const [trimestresData, setTrimestresData] = useState([
    {
      trimestre: "Primer Trimestre",
      fumaPas: false,
      fumaAct: false,
      droga: false,
      alcohol: false,
      violencia: false,
    },
    {
      trimestre: "Segundo Trimestre",
      fumaPas: false,
      fumaAct: false,
      droga: false,
      alcohol: false,
      violencia: false,
    },
    {
      trimestre: "Tercer Trimestre",
      fumaPas: false,
      fumaAct: false,
      droga: false,
      alcohol: false,
      violencia: false,
    },
  ]);

  const [Antirubeola, setAntirubeola] = useState([
    {
      previa: false,
      noSabe: false,
      embarazo: false,
      no: false,
    },
  ]);

  const [ExNormal, setExNormal] = useState([
    {
      Id: "id",
      Odont: false,
      Mamas: false,
    },
  ]);

  const [Cervix, setCervix] = useState([
    {
      InspVisual: "InspVisual",
      normal: false,
      anormal: false,
      noSeHizo: false,
    },
    {
      PAP: "PAP",
      normal: false,
      anormal: false,
      noSeHizo: false,
    },
    {
      COLP: "COLP",
      normal: false,
      anormal: false,
      noSeHizo: false,
    },
  ]);

  const [GrupoA, setGrupoA] = useState([
    {
      RH: "RH",
      imuniz: false,
      yglobulina_anti_D: "",
    },
    {
      RH: "RH",
      imuniz: false,
      yglobulina_anti_D: "",
    },
  ]);

  const [Toxoplasnosis, setToxoplasnosis] = useState([
    {
      menor12Semanas_igG: "Menor a 12 Semanas (IgM)",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
    {
      mayorigual_12Semanas_igG: "Mayor o Igual a 12 Semanas (IgM)",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
    {
      primera_consulta_igM: "Primera Consulta (IgM)",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
  ]);

  const [SuplementoIncial, setSuplementoIncial] = useState([
    {
      suplemento: "suplemento",
      fe: false,
      folatos: false,
      multi_vitaminas: false,
    },
  ]);

  const [Chagas, setChagas] = useState([
    {
      chagas: "",
      paludismo_malaria: "",
      bacteriuria: "",
      glusemia_EnAyuna: "",
      estreptococo: "",
    },
  ]);

  const [Consejeria, setConsejeria] = useState([
    {
      PreparacionParto: false,
      PlanificacionFamiliar: false,
      LactanciaMaterna: false,
      AmorPara_Chiquitos: false,
    },
  ]);

  const [VIHPrimeraPrueba, setVIHPrimeraPrueba] = useState([
    {
      menor12Semanas: "Menor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
    {
      mayor12Semanas: "Mayor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
  ]);

  const [VIHSegundaPrueba, setVIHSegundaPrueba] = useState([
    {
      menor12Semanas: "Menor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
    {
      mayor12Semanas: "Mayor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
  ]);

  const [SifilisPrimeraPrueba, setSifilisPrimeraPrueba] = useState([
    {
      menor12Semanas: "Menor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
    },
    {
      mayor12Semanas: "Mayor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
    },
  ]);

  const [SifilisSegundaPrueba, setSifilisSegundaPrueba] = useState([
    {
      menor12Semanas: "Menor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
    },
    {
      mayor12Semanas: "Mayor a 12 Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
      AnomaliasPrenatales: false,
    },
  ]);

  const [setCurrentIndex] = useState(0);
  const [AtencionesPrenatales, setAtencionesPrenatales] = useState([
    {
      fecha: "",
      edadGestacional: "",
      peso: "",
      PA: "",
      alturaUterina: "",
      presentacion: "",
      FCF_IPM: "",
      movimientosFetales: "",
      proteinuna: "",
      signosExamenesTratamiento: "",
      inicialesPersonalSalud: "",
      proximaCita: "",
    },
  ]);

  const addNewAtencionPrenatal = () => {
    if (AtencionesPrenatales.length < 8) {
      const newAtencionPrenatal = {
        fecha: "",
        edadGestacional: "",
        peso: "",
        PA: "",
        alturaUterina: "",
        presentacion: "",
        FCF_IPM: "",
        movimientosFetales: "",
        proteinuna: "",
        signosExamenesTratamiento: "",
        inicialesPersonalSalud: "",
        proximaCita: "",
      };

      setAtencionesPrenatales([...AtencionesPrenatales, newAtencionPrenatal]);

      // Actualiza el índice para mostrar la nueva atención agregada
      setCurrentIndex(AtencionesPrenatales.length);
    }
  };
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [Recomendaciones, setRecomendaciones] = useState([
    {
      recomendaciones: "",
      Id_Medico:"",
    }
  ]);
  const toggleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleTrimestreChange = (index, field, newValue) => {
    const updatedTrimestresData = [...trimestresData];
    updatedTrimestresData[index][field] = newValue ? true : false;
    setTrimestresData(updatedTrimestresData);
  };

  const handleAntirubeola = (index, field, newValue) => {
    const updatedAntirubeola = [...Antirubeola];
    updatedAntirubeola[index][field] = newValue ? true : false;
    setAntirubeola(updatedAntirubeola);
  };

  const handleExNormal = (index, field, newValue) => {
    const updatedExNormal = [...ExNormal];
    updatedExNormal[index][field] = newValue ? true : false;
    setExNormal(updatedExNormal);
  };

  const handleCervix = (index, field, newValue) => {
    const updatedCervix = [...Cervix];
    updatedCervix[index][field] = newValue ? "si" : "no";
    setCervix(updatedCervix);
  };

  const handleGrupoA = (index, field, value) => {
    const updatedGrupoA = [...GrupoA];
    updatedGrupoA[index][field] = value;
    setGrupoA(updatedGrupoA);
  };

  const handleToxoplasnosis = (index, field, newValue) => {
    const updatedToxoplasnosis = [...Toxoplasnosis];
    updatedToxoplasnosis[index][field] = newValue ? true : false;
    setToxoplasnosis(updatedToxoplasnosis);
  };

  const handleSuplementoInicial = (index, field, newValue) => {
    const updatedhandleSuplementoInicial = [...SuplementoIncial];
    updatedhandleSuplementoInicial[index][field] = newValue ? true : false;
    setSuplementoIncial(updatedhandleSuplementoInicial);
  };

  const handleChagas = (index, field, value) => {
    const updatedChagas = [...Chagas];
    updatedChagas[index][field] = value;
    setChagas(updatedChagas);
  };

  const handleConsejeria = (index, field, newValue) => {
    const updatedhandleConsejeria = [...Consejeria];
    updatedhandleConsejeria[index][field] = newValue ? true : false;
    setConsejeria(updatedhandleConsejeria);
  };

  const handleVIHPrimeraPrueba = (index, field, newValue) => {
    const updatedVIHPrimeraPrueba = [...VIHPrimeraPrueba];
    updatedVIHPrimeraPrueba[index][field] = newValue;
    setVIHPrimeraPrueba(updatedVIHPrimeraPrueba);
  };
  const handleVIHPSegundaPrueba = (index, field, newValue) => {
    const updatedVIHSegundaPrueba = [...VIHSegundaPrueba];
    updatedVIHSegundaPrueba[index][field] = newValue;
    setVIHSegundaPrueba(updatedVIHSegundaPrueba);
  };

  const handleSifilisPrimeraPrueba = (index, field, newValue) => {
    const updatedSifilisPrimeraPrueba = [...SifilisPrimeraPrueba];
    updatedSifilisPrimeraPrueba[index][field] = newValue;
    setSifilisPrimeraPrueba(updatedSifilisPrimeraPrueba);
  };

  const handleSifilisSegundaPrueba = (index, field, newValue) => {
    const updatedSifilisSegundaPrueba = [...SifilisSegundaPrueba];
    updatedSifilisSegundaPrueba[index][field] = newValue;
    setSifilisSegundaPrueba(updatedSifilisSegundaPrueba);
  };

  const handleAtencionesPrenatales = (index, field, value) => {
    const updatedAtencionesPrenatales = [...AtencionesPrenatales];
    updatedAtencionesPrenatales[index][field] = value;
    setAtencionesPrenatales(updatedAtencionesPrenatales);
  };
  const handleRecomendacionChange = (index, campo, value) => {
    const nuevasRecomendaciones = [...Recomendaciones];
    nuevasRecomendaciones[index][campo] = value;
    setRecomendaciones(nuevasRecomendaciones);
  };


  useEffect(() => {
    if (cachedId) {
      try {
        const docRef = db.collection("cartilla").doc(cachedId);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data.ModuloGestacionActual) {
              const {
                pesoAnterior,
                talla,
                imc,
                DateFUM,
                DateFPP,
                selectedOptionECO,
                selectedOptionFUM,
                trimestresData,
                Antirubeola,
                ExNormal,
                Cervix,
                GrupoA,
                Toxoplasnosis,
                SuplementoIncial,
                Chagas,
                Consejeria,
                VIHPrimeraPrueba,
                VIHSegundaPrueba,
                SifilisPrimeraPrueba,
                SifilisSegundaPrueba,
                AtencionesPrenatales,
                Eventos,
                Recomendaciones,
              } = data.ModuloGestacionActual;

              setPesoAnterior(pesoAnterior);
              setTalla(talla);
              setIMC(imc);
              setDateFUM(DateFUM);
              setDateFPP(DateFPP);
              setSelectedOptionECO(selectedOptionECO);
              setSelectedOptionFUM(selectedOptionFUM);
              setTrimestresData(trimestresData);
              setAntirubeola(Antirubeola);
              setExNormal(ExNormal);
              setCervix(Cervix);
              setGrupoA(GrupoA);
              setToxoplasnosis(Toxoplasnosis);
              setSuplementoIncial(SuplementoIncial);
              setChagas(Chagas);
              setConsejeria(Consejeria);
              setVIHPrimeraPrueba(VIHPrimeraPrueba);
              setVIHSegundaPrueba(VIHSegundaPrueba);
              setSifilisPrimeraPrueba(SifilisPrimeraPrueba);
              setSifilisSegundaPrueba(SifilisSegundaPrueba);
              setAtencionesPrenatales(AtencionesPrenatales);
              setRecomendaciones(Recomendaciones);

              //Cargar Eventos - Asegurando que los eventos sean un array
              setEventos(Eventos || []);
            }
          }
        });
      } catch (error) {
        console.log("Error al cargar datos desde Firebase", error);
      }
    }
  }, [cachedId]);


  //Funcion para agregar un nuevo evento
  const handleEventClick = (nuevoEvento) => {
    // Agregar el nuevo evento al estado de eventos
    setEventos([...eventos, nuevoEvento]);
  };

  // Asegúrate de que events esté en el formato correcto antes de pasarlo a CalendarComponent
  const eventsWithDatesConverted = eventos.map((event) => ({
    ...event,
    start: event.start instanceof Timestamp ? event.start.toDate() : event.start,
    end: event.end instanceof Timestamp ? event.end.toDate() : event.end,
  }));

  useEffect(() => {
    calcularIMC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pesoAnterior, talla]);

  const calcularIMC = () => {
    if (!pesoAnterior || !talla) {
      setIMC("");
      return;
    }

    const IMCResultado = (pesoAnterior / (talla * talla)).toFixed(2);
    setIMC(IMCResultado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (cachedId) {
      console.log(cachedId);
      try {
        const docRef = db.collection("cartilla").doc(cachedId);
        const doc = await docRef.get();

        if (doc.exists) {
          // obten los datos actuales del documento
          const data = doc.data();
          data.ModuloGestacionActual = {
            Eventos: eventos,
            pesoAnterior: pesoAnterior,
            talla: talla,
            imc: imc,
            DateFUM: DateFUM,
            DateFPP: DateFPP,
            selectedOptionECO: selectedOptionECO,
            selectedOptionFUM: selectedOptionFUM,
            trimestresData: trimestresData,
            Antirubeola: Antirubeola,
            ExNormal: ExNormal,
            Cervix: Cervix,
            GrupoA: GrupoA,
            Toxoplasnosis: Toxoplasnosis,
            SuplementoIncial: SuplementoIncial,
            Chagas: Chagas,
            Consejeria: Consejeria,
            VIHPrimeraPrueba: VIHPrimeraPrueba,
            VIHSegundaPrueba: VIHSegundaPrueba,
            SifilisPrimeraPrueba: SifilisPrimeraPrueba,
            SifilisSegundaPrueba: SifilisSegundaPrueba,
            AtencionesPrenatales: AtencionesPrenatales,
            Recomendaciones: Recomendaciones,
          };

          await docRef.set(data);

          alert("Datos enviados con exito");

          // Limpia los eventos
          setEventos([]);

          setPesoAnterior("");
          setTalla("");
          setIMC("");
          setDateFUM("");
          setDateFPP("");
          setSelectedOptionECO("");
          setSelectedOptionFUM("");

          setTrimestresData([
            {
              trimestre: "Primer Trimestre",
              fumaPas: false,
              fumaAct: false,
              droga: false,
              alcohol: false,
              violencia: false,
            },
            {
              trimestre: "Segundo Trimestre",
              fumaPas: false,
              fumaAct: false,
              droga: false,
              alcohol: false,
              violencia: false,
            },
            {
              trimestre: "Tercer Trimestre",
              fumaPas: false,
              fumaAct: false,
              droga: false,
              alcohol: false,
              violencia: false,
            },
          ]);

          setAntirubeola([
            {
              previa: false,
              noSabe: false,
              embarazo: false,
              no: false,
            },
          ]);

          setExNormal([
            {
              Id: "id",
              Odont: false,
              Mamas: false,
            },
          ]);

          setCervix([
            {
              InspVisual: "InspVisual",
              normal: false,
              anormal: false,
              noSeHizo: false,
            },
            {
              PAP: "PAP",
              normal: false,
              anormal: false,
              noSeHizo: false,
            },
            {
              COLP: "COLP",
              normal: false,
              anormal: false,
              noSeHizo: false,
            },
          ]);

          setGrupoA([
            {
              RH: "",
              imuniz: false,
              yglobulina_anti_D: "",
            },
          ]);

          setToxoplasnosis([
            {
              menor12Semanas_igG: "Menor a 12 Semanas (IgM)",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
            {
              mayorigual_12Semanas_igG: "Mayor o Igual a 12 Semanas (IgM)",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
            {
              primera_consulta_igM: "Primera Consulta (IgM)",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
          ]);

          setSuplementoIncial([
            {
              suplemento: "Suplemento",
              fe: false,
              folatos: false,
              multi_vitaminas: false,
            },
          ]);

          setChagas([
            {
              chagas: "",
              paludismo_malaria: "",
              bacteriuria: "",
              glusemia_EnAyuna: "",
              estreptococo: "",
            },
          ]);

          setConsejeria([
            {
              PreparacionParto: false,
              PlanificacionFamiliar: false,
              LactanciaMaterna: false,
              AmorPara_Chiquitos: false,
            },
          ]);

          setVIHPrimeraPrueba([
            {
              menor12Semanas: "Menor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
            {
              mayor12Semanas: "Mayor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
          ]);

          setVIHSegundaPrueba([
            {
              menor12Semanas: "Menor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
            {
              mayor12Semanas: "Mayor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
          ]);

          setSifilisPrimeraPrueba([
            {
              menor12Semanas: "Menor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
            },
            {
              mayor12Semanas: "Mayor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
            },
          ]);

          setSifilisSegundaPrueba([
            {
              menor12Semanas: "Menor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
            },
            {
              mayor12Semanas: "Mayor a 12 Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
              AnomaliasPrenatales: false,
            },
          ]);

          setAtencionesPrenatales([
            {
              fecha: "",
              edadGestacional: "",
              peso: "",
              PA: "",
              alturaUterina: "",
              presentacion: "",
              FCF_IPM: "",
              movimientosFetales: "",
              proteinuna: "",
              signosExamenesTratamiento: "",
              inicialesPersonalSalud: "",
              proximaCita: "",
            },
          ]);
          setRecomendaciones([
            {
              recomendaciones: "",
              Id_Medico:"",
            }
          ]);

          setShowCalendar(false);

        } else {
          console.error("El documento no existe");
        }
      } catch (error) {
        console.log("Error al actualizar datos en firebase", error);
      }
    } else {
      alert("No se pudo encontrar un Id válido en localStorage");
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
    <div className="secondModuleScreenContainer">
      <div className="navContainerSecond">
        <NavBarComponent
          onSignOut={handleLogout}
          showCloseExpedienteButton={false}
        />
      </div>
      <div className="formSecondModule">
        <div className="sectionInformation">
          <h2 className="title">
            Historia Clínica Perinatal - Gestacion Actual
          </h2>
          <div className="alertGroup">
            <span className="alert"></span>
            <h2 className="alertTitle">Amarillo es ALERTA</h2>
            <button onClick={() => setShowCalendar(!showCalendar)}>
              {showCalendar ? "Mostrar Formulario" : "Mostrar Calendario"}
            </button>
            <button onClick={toggleMostrarFormulario} >
                {/* <img src={Buscar} alt="Buscar" style={{ marginRight: '1%' }} /> */}
                {mostrarFormulario ? "Mostrar Recomendaciones" : "Mostrar Formulario"  }
              </button>
          </div>
        </div>
        {showCalendar ? (
          <CalendarComponent events={eventsWithDatesConverted} onEventClick={handleEventClick} />
        ) : (
          <div>
             {mostrarFormulario ? (
         
          <form>
            <div className="formularioSecondModule">
              <div className="formularioSecondChildren">
                <label>Peso</label>
                <input
                  className="inputNumberSecond"
                  type="number"
                  step="0.1"
                  value={pesoAnterior}
                  onChange={(e) => setPesoAnterior(e.target.value)}
                  placeholder="(Kg)"
                />
              </div>
              <div className="formularioSecondChildren">
                <label>Talla</label>
                <input
                  className="inputNumberFourth"
                  type="number"
                  step="0.01"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  placeholder="(m)"
                />
              </div>

              <div className="formularioSecondChildren">
                <label htmlFor="multi-last-name">IMC:</label>
                <input
                  className="inputNumberSecond"
                  type="number"
                  step="0.01"
                  required
                  value={imc}
                  readOnly
                />
              </div>
              <div className="formularioSecondChildren">
                <label htmlFor="multi-last-name">FUM</label>
                <input
                  className="inputNumberSecond"
                  type="date"
                  value={DateFUM}
                  onChange={(e) => setDateFUM(e.target.value)}
                />
              </div>
              <div className="formularioSecondChildren">
                <label htmlFor="multi-last-name">FPP</label>
                <input
                  className="inputNumberSecond"
                  type="date"
                  value={DateFPP}
                  onChange={(e) => setDateFPP(e.target.value)}
                />
              </div>
              <div className="formularioSecondChildren">
                <label htmlFor="multi-last-Eco">ECOmenor20s</label>

                <Switch
                  checked={selectedOptionECO === "si"}
                  onChange={(newValue) =>
                    setSelectedOptionECO(newValue ? "si" : "no")
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioSecondChildren">
                <label>FUM</label>
                <Switch
                  checked={selectedOptionFUM === "si"}
                  onChange={(newValue) =>
                    setSelectedOptionFUM(newValue ? "si" : "no")
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
            </div>
            {/* trimestres */}
            <h2>Controles por Trimestre</h2>
            {trimestresData.map((trimestre, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    {`Trimestre ${index + 1}`}
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`fumaPas${index}`}>FumaPAS</label>
                    <Switch
                      id={`fumaPas${index}`}
                      checked={trimestre.fumaPas === true}
                      onChange={(newValue) =>
                        handleTrimestreChange(index, "fumaPas", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`fumaAct${index}`}>FumaACT</label>
                    <Switch
                      id={`fumaAct${index}`}
                      checked={trimestre.fumaAct === true}
                      onChange={(newValue) =>
                        handleTrimestreChange(index, "fumaAct", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`droga${index}`}>DROGA</label>
                    <Switch
                      id={`droga${index}`}
                      checked={trimestre.droga === true}
                      onChange={(newValue) =>
                        handleTrimestreChange(index, "droga", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`alcohol${index}`}>ALCOHOL</label>
                    <Switch
                      id={`alcohol${index}`}
                      checked={trimestre.alcohol === true}
                      onChange={(newValue) =>
                        handleTrimestreChange(index, "alcohol", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`violencia${index}`}>VIOLENCIA</label>
                    <Switch
                      id={`violencia${index}`}
                      checked={trimestre.violencia === true}
                      onChange={(newValue) =>
                        handleTrimestreChange(index, "violencia", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Antirubeola */}
            <h2>Antirubeola</h2>
            {Antirubeola.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label htmlFor="multi-last-name">Previa</label>

                    <Switch
                      id={`previa${index}`}
                      checked={item.previa === true}
                      onChange={(newValue) =>
                        handleAntirubeola(index, "previa", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor="multi-last-name">Embarazo</label>
                    <Switch
                      checked={item.embarazo === true}
                      onChange={(newValue) =>
                        handleAntirubeola(index, "embarazo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor="multi-last-name">No sabe</label>
                    <Switch
                      checked={item.noSabe === true}
                      onChange={(newValue) =>
                        handleAntirubeola(index, "noSabe", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor="multi-last-name">No</label>
                    <Switch
                      checked={item.no === true}
                      onChange={(newValue) =>
                        handleAntirubeola(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* EX NORMAL */}
            <h2>EX NORMAL</h2>
            {ExNormal.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label htmlFor={`Odont${item}`}>ODONT</label>
                    <Switch
                      id={`Odont${item}`}
                      checked={item.Odont === true}
                      onChange={(newValue) =>
                        handleExNormal(index, "Odont", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`Mamas${item}`}>MAMÁS</label>
                    <Switch
                      id={`Mamas${item}`}
                      checked={item.Mamas === true}
                      onChange={(newValue) =>
                        handleExNormal(index, "Mamas", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* CERVIX */}
            <h2>CERVIX</h2>
            {Cervix.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>{item[item.InspVisual || item.PAP || item.COLP]}</label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`normal${index}`}>Normal</label>
                    <Switch
                      id={`normal${index}`}
                      checked={item.normal === "si"}
                      onChange={(newValue) =>
                        handleCervix(index, "normal", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`anormal${index}`}>Anormal</label>
                    <Switch
                      id={`anormal${index}`}
                      checked={item.anormal === "si"}
                      onChange={(newValue) =>
                        handleCervix(index, "anormal", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`noSeHizo${index}`}>No se hizo</label>
                    <Switch
                      id={`noSeHizo${index}`}
                      checked={item.noSeHizo === "si"}
                      onChange={(newValue) =>
                        handleCervix(index, "noSeHizo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* grupo */}

            {GrupoA.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <h2>Grupos</h2>
                  </div>
                  <div className="formularioSecondChildren">
                    <label> RH</label>
                    <select
                      className="inputNumberSecond"
                      value={item.RH}
                      onChange={(e) => handleGrupoA(index, "RH", e.target.value)}
                    >
                      <option>Opciones</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label>inmuniz</label>
                    <Switch
                      checked={item.imuniz == true}
                      onChange={(value) => handleGrupoA(index, "imuniz", value)}
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label> yglobulina_anti_D</label>
                    <select
                      className="inputNumberSecond"
                      value={item.yglobulina_anti_D}
                      onChange={(e) =>
                        handleGrupoA(index, "yglobulina_anti_D", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {/* toxoplasmosis */}
            <div className="formularioSecondChildren">
              <h2>Toxoplasnosis</h2>
            </div>
            {Toxoplasnosis.map((trimestre, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>
                      {trimestre.menor12Semanas_igG ||
                        trimestre.mayorigual_12Semanas_igG ||
                        trimestre.primera_consulta_igM}
                    </label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`negativo${index}`}>-</label>
                    <Switch
                      id={`negativo${index}`}
                      checked={trimestre.negativo === true}
                      onChange={(newValue) =>
                        handleToxoplasnosis(index, "negativo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`positivo${index}`}>+</label>
                    <Switch
                      id={`positivo${index}`}
                      checked={trimestre.positivo === true}
                      onChange={(newValue) =>
                        handleToxoplasnosis(index, "positivo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`noSehizo${index}`}>No se hizo</label>
                    <Switch
                      id={`noSehizo${index}`}
                      checked={trimestre.noSehizo === true}
                      onChange={(newValue) =>
                        handleToxoplasnosis(index, "noSehizo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* SUPLEMENTO INICIAL */}
            {SuplementoIncial.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <h2>Suplementos</h2>
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Fe</label>
                    <Switch
                      checked={item.fe === true}
                      onChange={(newValue) =>
                        handleSuplementoInicial(index, "fe", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Folatos</label>
                    <Switch
                      checked={item.folatos === true}
                      onChange={(newValue) =>
                        handleSuplementoInicial(index, "folatos", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Multi Vitaminas</label>
                    <Switch
                      checked={item.multi_vitaminas === true}
                      onChange={(newValue) =>
                        handleSuplementoInicial(index, "multi_vitaminas", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* CHAGAS */}
            {Chagas.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <h2>Chagas</h2>
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Chagas</label>
                    <select
                      className="inputNumberSecond"
                      value={item.chagas}
                      onChange={(e) =>
                        handleChagas(index, "chagas", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="-">-</option>
                      <option value="+">+</option>
                      <option value="No se hizo">No se hizo</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Paludismo malaria</label>
                    <select
                      className="inputNumberSecond"
                      value={item.paludismo_malaria}
                      onChange={(e) =>
                        handleChagas(index, "paludismo_malaria", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="-">-</option>
                      <option value="+">+</option>
                      <option value="No se hizo">No se hizo</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label> Bacteriuria</label>
                    <select
                      className="inputNumberSecond"
                      value={item.bacteriuria}
                      onChange={(e) =>
                        handleChagas(index, "bacteriuria", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="Normal">Normal</option>
                      <option value="Anormal">Anormal</option>
                      <option value="No se hizo">No se hizo</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label> Glusemia en ayuna</label>
                    <select
                      className="inputNumberSecond"
                      value={item.glusemia_EnAyuna}
                      onChange={(e) =>
                        handleChagas(index, "glusemia_EnAyuna", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="Mayor a 20 semanas">Mayor a 20 semanas</option>
                      <option value="Menor a 20 semanas">Menor a 20 semanas</option>
                    </select>
                  </div>

                  <div className="formularioSecondChildren">
                    <label>Estreptococo</label>
                    <select
                      className="inputNumberSecond"
                      value={item.estreptococo}
                      onChange={(e) =>
                        handleChagas(index, "estreptococo", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="-">-</option>
                      <option value="+">+</option>
                      <option value="No se hizo">No se hizo</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* CONSEJETRIA */}

            {Consejeria.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <h3>CONSEJERIA</h3>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`PreparacionParto${item}`}>
                      PreparacionParto
                    </label>
                    <Switch
                      id={`PreparacionParto${item}`}
                      checked={item.PreparacionParto === true}
                      onChange={(newValue) =>
                        handleConsejeria(index, "PreparacionParto", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`PlanificacionFamiliar${item}`}>
                      Planificacion Familiar
                    </label>
                    <Switch
                      id={`PlanificacionFamiliar${item}`}
                      checked={item.PlanificacionFamiliar === true}
                      onChange={(newValue) =>
                        handleConsejeria(index, "PlanificacionFamiliar", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioSecondChildren">
                    <label htmlFor={`LactanciaMaterna${item}`}>
                      Lactancia Materna
                    </label>
                    <Switch
                      id={`LactanciaMaterna${item}`}
                      checked={item.LactanciaMaterna === true}
                      onChange={(newValue) =>
                        handleConsejeria(index, "LactanciaMaterna", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioSecondChildren">
                    <label htmlFor={`AmorPara_Chiquitos${item}`}>
                      Amor Para los mas Chiquitos
                    </label>
                    <Switch
                      id={`AmorPara_Chiquitos${item}`}
                      checked={item.AmorPara_Chiquitos === true}
                      onChange={(newValue) =>
                        handleConsejeria(index, "AmorPara_Chiquitos", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* VIH Primera prueba solicitada */}
            <div className="formularioSecondChildren">
              <h2>VIH Primera prueba solicitada</h2>
            </div>
            {VIHPrimeraPrueba.map((trimestre, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>
                      {

                        trimestre.menor12Semanas || trimestre.mayor12Semanas

                      }
                    </label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={trimestre.si === true}
                      onChange={(newValue) =>
                        handleVIHPrimeraPrueba(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={trimestre.no === true}
                      onChange={(newValue) =>
                        handleVIHPrimeraPrueba(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`nc${index}`}>N/C</label>
                    <Switch
                      id={`nc${index}`}
                      checked={trimestre.nc === true}
                      onChange={(newValue) =>
                        handleVIHPrimeraPrueba(index, "nc", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Resultado</label>
                    <select
                      className="inputNumberSecond"
                      value={trimestre.result}
                      onChange={(e) =>
                        handleVIHPrimeraPrueba(index, "result", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="N/C">N/C</option>
                      <option value="S/D">S/D</option>
                    </select>
                  </div>

                  <div className="formularioSecondChildren">
                    <label>TARV en Embarazo</label>
                    <select
                      className="inputNumberSecond"
                      value={trimestre.tarv_enEmbarazo}
                      onChange={(e) =>
                        handleVIHPrimeraPrueba(
                          index,
                          "tarv_enEmbarazo",
                          e.target.value
                        )
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* VIH Segunda prueba solicitada */}
            <div className="formularioSecondChildren">
              <h2>VIH Segunda prueba solicitada</h2>
            </div>
            {VIHSegundaPrueba.map((trimestre, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>
                      {

                        trimestre.menor12Semanas || trimestre.mayor12Semanas

                      }
                    </label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={trimestre.si === true}
                      onChange={(newValue) =>
                        handleVIHPSegundaPrueba(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={trimestre.no === true}
                      onChange={(newValue) =>
                        handleVIHPSegundaPrueba(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`nc${index}`}>N/C</label>
                    <Switch
                      id={`nc${index}`}
                      checked={trimestre.nc === true}
                      onChange={(newValue) =>
                        handleVIHPSegundaPrueba(index, "nc", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Resultado</label>
                    <select
                      className="inputNumberSecond"
                      value={trimestre.result}
                      onChange={(e) =>
                        handleVIHPSegundaPrueba(index, "result", e.target.value)
                      }
                    >

                      <option>Opciones</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="N/C">N/C</option>
                      <option value="S/D">S/D</option>
                    </select>
                  </div>

                  <div className="formularioSecondChildren">
                    <label>TARV en Embarazo</label>
                    <select
                      className="inputNumberSecond"
                      value={trimestre.tarv_enEmbarazo}
                      onChange={(e) =>
                        handleVIHPSegundaPrueba(
                          index,
                          "tarv_enEmbarazo",
                          e.target.value
                        )
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Sifilis Primera prueba solicitada */}
            <div className="formularioSecondChildren">
              <h2> Sifilis Primera prueba solicitada</h2>
            </div>
            {SifilisPrimeraPrueba.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>
                      {item.menor12Semanas || item.mayor12Semanas}
                    </label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={item.si === true}
                      onChange={(newValue) =>
                        handleSifilisPrimeraPrueba(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={item.no === true}
                      onChange={(newValue) =>
                        handleSifilisPrimeraPrueba(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`nc${index}`}>N/C</label>
                    <Switch
                      id={`nc${index}`}
                      checked={item.nc === true}
                      onChange={(newValue) =>
                        handleSifilisPrimeraPrueba(index, "nc", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Resultado</label>
                    <select
                      className="inputNumberSecond"
                      value={item.result}
                      onChange={(e) =>
                        handleSifilisPrimeraPrueba(index, "result", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="N/C">N/C</option>
                      <option value="S/D">S/D</option>
                    </select>
                  </div>

                  <div className="formularioSecondChildren">
                    <label>TARV en Embarazo</label>
                    <select
                      className="inputNumberSecond"
                      value={item.tratamientoCon_Penisilina}
                      onChange={(e) =>
                        handleSifilisPrimeraPrueba(
                          index,
                          "tratamientoCon_Penisilina",
                          e.target.value
                        )
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`TtoDeLa_Pareja${index}`}>
                      Tto De la Pareja
                    </label>
                    <Switch
                      id={`TtoDeLa_Pareja${index}`}
                      checked={item.TtoDeLa_Pareja === true}
                      onChange={(newValue) =>
                        handleSifilisPrimeraPrueba(
                          index,
                          "TtoDeLa_Pareja",
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

            {/* Sifilis Segunda prueba solicitada */}
            <div className="formularioSecondChildren">
              <h2> Sifilis Segunda prueba solicitada</h2>
            </div>
            {SifilisSegundaPrueba.map((item, index) => (
              <div key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    <label>
                      {item.menor12Semanas || item.mayor12Semanas}
                    </label>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={item.si === true}
                      onChange={(newValue) =>
                        handleSifilisSegundaPrueba(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={item.no === true}
                      onChange={(newValue) =>
                        handleSifilisSegundaPrueba(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`nc${index}`}>N/C</label>
                    <Switch
                      id={`nc${index}`}
                      checked={item.nc === true}
                      onChange={(newValue) =>
                        handleSifilisSegundaPrueba(index, "nc", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Resultado</label>
                    <select
                      className="inputNumberSecond"
                      value={item.result}
                      onChange={(e) =>
                        handleSifilisSegundaPrueba(index, "result", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="N/C">N/C</option>
                      <option value="S/D">S/D</option>
                    </select>
                  </div>

                  <div className="formularioSecondChildren">
                    <label>TARV en Embarazo</label>
                    <select
                      className="inputNumberSecond"
                      value={item.tratamientoCon_Penisilina}
                      onChange={(e) =>
                        handleSifilisSegundaPrueba(
                          index,
                          "tratamientoCon_Penisilina",
                          e.target.value
                        )
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div>
                  <div className="formularioSecondChildren">
                    <label htmlFor={`TtoDeLa_Pareja${index}`}>
                      Tto De la Pareja
                    </label>
                    <Switch
                      id={`TtoDeLa_Pareja${index}`}
                      checked={item.TtoDeLa_Pareja === true}
                      onChange={(newValue) =>
                        handleSifilisSegundaPrueba(
                          index,
                          "TtoDeLa_Pareja",
                          newValue
                        )
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioSecondChildren">
                    <label htmlFor={`AnomaliasPrenatales${index}`}>
                      Anomalias prenatales
                    </label>
                    <Switch
                      id={`AnomaliasPrenatales${index}`}
                      checked={item.AnomaliasPrenatales === true}
                      onChange={(newValue) =>
                        handleSifilisSegundaPrueba(
                          index,
                          "AnomaliasPrenatales",
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

            {/* Atenciones Prenatales */}
            <h2>Atenciones Prenatales</h2>
            {AtencionesPrenatales.map((atencion, index) => (
              <div className="atenciones" key={index}>
                <div className="formularioSecondModule">
                  <div className="formularioSecondChildren">
                    Lista de Atenciones prentales {index + 1}
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Fecha</label>
                    <input
                      className="inputNumberSecond"
                      type="date"
                      value={atencion.fecha}
                      onChange={(e) =>
                        handleAtencionesPrenatales(index, "fecha", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Edad Gestacional</label>
                    <input
                      className="inputNumberSecond"
                      type="number"
                      value={atencion.edadGestacional}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "edadGestacional",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Peso</label>
                    <input
                      className="inputNumberSecond"
                      type="number"
                      value={atencion.peso}
                      onChange={(e) =>
                        handleAtencionesPrenatales(index, "peso", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>PA</label>
                    <input
                      className="inputNumberSecond"
                      type="text"
                      value={atencion.PA}
                      onChange={(e) =>
                        handleAtencionesPrenatales(index, "PA", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Alture Uterina</label>
                    <input
                      className="inputNumberSecond"
                      type="text"
                      value={atencion.alturaUterina}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "alturaUterina",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Presentacion</label>
                    <input
                      className="inputNumberSecond"
                      type="text"
                      value={atencion.presentacion}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "presentacion",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>FCF</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.FCF_IPM}
                      onChange={(e) =>
                        handleAtencionesPrenatales(index, "FCF_IPM", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Movimiento Fetales</label>
                    <input
                      className="text"
                      type="number"
                      value={atencion.movimientosFetales}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "movimientosFetales",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Proteinuna</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.proteinuna}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "proteinuna",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Iniciales Personal salud</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.inicialesPersonalSalud}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "inicialesPersonalSalud",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Proxima Cita</label>
                    <input
                      className="inputNumberSecond"
                      type="date"
                      value={atencion.proximaCita}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "proximaCita",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioSecondChildren">
                    <label>Tratamiento</label>
                    <textarea
                      className="texareaSignos"
                      placeholder="Signos, Examenes Tratamiento"
                      value={atencion.signosExamenesTratamiento}
                      onChange={(e) =>
                        handleAtencionesPrenatales(
                          index,
                          "signosExamenesTratamiento",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

              </div>
            ))}

          </form>
 ) : (
  <div>
    {/* Aquí deberías colocar tu lógica para mostrar las recomendaciones */}
    <h2>Recomendaciones</h2>
    {Recomendaciones.map((rec, index) => (
      <div key={index}>
        <div className="formularioSecondModule">
          <div className="formularioSecondChildren">
            <label className="textCenter">ID del Médico </label>
            <input
                  className="recomendaciones"
                  type="text" // Cambiado a tipo 'text' para permitir maxLength
                  value={rec.Id_Medico}
                  maxLength="5" // Limitar a 5 caracteres
                  onInput={(e) => {
                    // Filtrar solo los dígitos
                    const inputValue = e.target.value.replace(/\D/g, '');
                    // Actualizar el valor del estado con los primeros 5 caracteres
                    handleRecomendacionChange(index, 'Id_Medico', inputValue.slice(0, 5));
                  }}
                />

          </div>
          <div className="formularioSecondChildren">
            <label className="textCenter">Recomendación del personal Médico</label>
            <textarea
            placeholder="Recomendaciones del personal Médico"
            className="textAreaRecomendaciones"
              rows="4"
              cols="50"
              value={rec.recomendaciones}
              onChange={(e) => handleRecomendacionChange(index, 'recomendaciones', e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>
          {/* <div className="formularioSecondChildren">
            <button type="button" onClick={agregarRecomendacion}>
              Agregar Otra Recomendación
            </button>
          </div> */}

        </div>
      </div>
    ))}
  </div>
)}


           </div>

        )}
        <button className="ButtonEnviarSecond" onClick={addNewAtencionPrenatal}>Agregar Nueva Atención</button>
        <div className="containerButtonSecond">
          <button className="ButtonEnviarSecond" onClick={handleSubmit}>
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
      </div>
    </div>
  );
};

SecondModuleScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default SecondModuleScreen;
