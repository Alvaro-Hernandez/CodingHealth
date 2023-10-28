import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";

import Switch from "react-switch";

const SecondModuleScreen = ({ onSignOut }) => {
  const [, setLocation] = useLocation();
  const [pesoAnterior, setPesoAnterior] = useState("");
  const [talla, setTalla] = useState("");
  const [imc, setIMC] = useState("");
  const [DateFUM, setDateFUM] = useState("");
  const [DateFPP, setDateFPP] = useState("");
  const [selectedOptionFUM, setSelectedOptionFUM] = useState("");
  const [selectedOptionECO, setSelectedOptionECO] = useState("");
  const [, setLoader] = useState(false);
  const cachedId = localStorage.getItem("cachedId");

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
      previa: "",
      noSabe: "",
      embarazo: "",
      no: "",
    },
  ]);

  const [Antitetanica, setAntitetanica] = useState([
    {
      Id: "id",
      vigente: "",
      Dosis1: "",
      Dosis2: "",
    },
  ]);

  const [ExNormal, setExNormal] = useState([
    {
      Id: "id",
      Odont: "",
      Mamas: "",
    },
  ]);
  const [GrupoA, setGrupoA] = useState([
    {
      RH: "RH",
      imuniz: "",
      yglobulina_anti_D: "",
    },
    {
      RH: "RH",
      imuniz: "",
      yglobulina_anti_D: "",
    },
  ]);
  const [Toxoplasnosis, setToxoplasnosis] = useState([
    {
      menor12Senanas_igG: "menor12Senanas_igG",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
    {
      mayorigual_12Senanas_igG: "mayorigual_12Senanas_igG",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
    {
      primera_consulta_igM: "primera_consulta_igM",
      negativo: false,
      positivo: false,
      noSehizo: false,
    },
  ]);

  const [Cervix, setCervix] = useState([
    {
      InspVisual: "InspVisual",
      normal: "",
      anormal: "",
      noSeHizo: "",
    },
    {
      PAP: "PAP",
      normal: "",
      anormal: "",
      noSeHizo: "",
    },
    {
      COLP: "COLP",
      normal: "",
      anormal: "",
      noSeHizo: "",
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

  const [Changas, setChangas] = useState([
    {
      changas: "",
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
      menor12Semanas: "menor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
    {
      mayor12Semanas: "mayor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
  
  ]);

  const [VIHSegundaPrueba, setVIHSegundaPrueba] = useState([
    {
      menor12Semanas: "menor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
    {
      mayor12Semanas: "mayor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tarv_enEmbarazo: "",
    },
  
  ]);

  const [SifilisPrimeraPrueba, setSifilisPrimeraPrueba] = useState([
    {
      menor12Semanas: "menor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
    },
    {
      mayor12Semanas: "mayor12Semanas",
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
      menor12Semanas: "menor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
    },
    {
      mayor12Semanas: "mayor12Semanas",
      si: false,
      no: false,
      nc: false,
      result: "",
      tratamientoCon_Penisilina: "",
      TtoDeLa_Pareja: false,
      AnomaliasPrenatales: false,
    },
  
  ]);

  const handleCervix = (index, field, newValue) => {
    const updatedCervix = [...Cervix];
    updatedCervix[index][field] = newValue ? "si" : "no";
    setCervix(updatedCervix);
  };

  const handleExNormal = (index, field, newValue) => {
    const updatedExNormal = [...ExNormal];
    updatedExNormal[index][field] = newValue ? "si" : "no";
    setExNormal(updatedExNormal);
  };
  const handleGrupoA = (index, field, value) => {
    const updatedGrupoA = [...GrupoA];
    updatedGrupoA[index][field] = value;
    setGrupoA(updatedGrupoA);
  };
  const handleSuplementoInicial = (index, field, newValue) => {
    const updatedhandleSuplementoInicial = [...SuplementoIncial];
    updatedhandleSuplementoInicial[index][field] = newValue ? true : false;
    setSuplementoIncial(updatedhandleSuplementoInicial);
  };

  const handleAntirubeola = (index, field, newValue) => {
    const updatedAntirubeola = [...Antirubeola];
    updatedAntirubeola[index][field] = newValue ? "si" : "no";
    setAntirubeola(updatedAntirubeola);
  };
  const handleTrimestreChange = (index, field, newValue) => {
    const updatedTrimestresData = [...trimestresData];
    updatedTrimestresData[index][field] = newValue ? true : false;
    setTrimestresData(updatedTrimestresData);
  };
  const handleToxoplasnosis = (index, field, newValue) => {
    const updatedToxoplasnosis = [...Toxoplasnosis];
    updatedToxoplasnosis[index][field] = newValue ? true : false;
    setToxoplasnosis(updatedToxoplasnosis);
  };
  const handleChangas = (index, field, value) => {
    const updatedChangas = [...Changas];
    updatedChangas[index][field] = value;
    setChangas(updatedChangas);
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

  // UseEffect para cargar los datos desde Firebase al montar el componente
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
                selectedOptionFUM,
                selectedOptionECO,
                trimestresData,
                Antirubeola,
                Antitetanica,
                ExNormal,
                AtencionesPrenatales,
                Cervix,
                GrupoA,
                Toxoplasnosis,
                SuplementoIncial,
                Changas,
                Consejeria,
                VIHPrimeraPrueba,
                VIHSegundaPrueba,
                SifilisPrimeraPrueba,
              } = data.ModuloGestacionActual;
              // Establecer los datos recuperados en el estado
              setPesoAnterior(pesoAnterior);
              setTalla(talla);
              setIMC(imc);
              setDateFUM(DateFUM);
              setDateFPP(DateFPP);
              setSelectedOptionFUM(selectedOptionFUM);
              setSelectedOptionECO(selectedOptionECO);
              setTrimestresData(trimestresData);
              setAntirubeola(Antirubeola);
              setAntitetanica(Antitetanica);
              setExNormal(ExNormal);
              setCervix(Cervix);
              setAtencionesPrenatales(AtencionesPrenatales);
              setGrupoA(GrupoA);
              setToxoplasnosis(Toxoplasnosis);
              setSuplementoIncial(SuplementoIncial);
              setChangas(Changas);
              setConsejeria(Consejeria);
              setVIHPrimeraPrueba(VIHPrimeraPrueba);
              setVIHSegundaPrueba(VIHSegundaPrueba)
              setSifilisPrimeraPrueba(SifilisPrimeraPrueba)
            }
          }
        });
      } catch (error) {
        console.log("Error al cargar datos desde Firebase", error);
      }
    }
  }, [cachedId]);

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
            pesoAnterior: pesoAnterior,
            talla: talla,
            imc: imc,
            DateFUM: DateFUM,
            DateFPP: DateFPP,
            selectedOptionFUM: selectedOptionFUM,
            selectedOptionECO: selectedOptionECO,

            trimestresData: trimestresData,
            Antirubeola: Antirubeola,
            Antitetanica: Antitetanica,
            ExNormal: ExNormal,
            Cervix: Cervix,
            AtencionesPrenatales: AtencionesPrenatales,
            GrupoA: GrupoA,
            Toxoplasnosis: Toxoplasnosis,
            SuplementoIncial: SuplementoIncial,
            Changas: Changas,
            Consejeria: Consejeria,
            VIHPrimeraPrueba: VIHPrimeraPrueba,
            VIHSegundaPrueba: VIHSegundaPrueba,
            SifilisPrimeraPrueba: SifilisPrimeraPrueba,
            SifilisSegundaPrueba: SifilisSegundaPrueba,
          };

          await docRef.set(data);

          alert("Datos enviados con exito");

          setPesoAnterior("");
          setTalla("");
          setIMC("");
          setDateFUM("");
          setDateFPP("");
          setSelectedOptionFUM("");
          setSelectedOptionECO("");

          setAntirubeola([
            {
              previa: "",
              noSabe: "",
              embarazo: "",
              no: "",
            },
          ]);

          setAntitetanica([
            {
              Id: "id",
              vigente: "",
              Dosis1: "",
              Dosis2: "",
            },
          ]);

          setExNormal([
            {
              Id: "id",
              Odont: "",
              Mamas: "",
            },
          ]);

          setCervix([
            {
              InspVisual: "InspVisual",
              normal: "",
              anormal: "",
              noSeHizo: "",
            },
            {
              PAP: "PAP",
              normal: "",
              anormal: "",
              noSeHizo: "",
            },
            {
              COLP: "COLP",
              normal: "",
              anormal: "",
              noSeHizo: "",
            },
          ]);

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
          setGrupoA([
            {
              RH: "",
              imuniz: "",
              yglobulina_anti_D: "",
            },
          ]);
          setToxoplasnosis([
            {
              menor12Senanas_igG: "menor12Senanas_igG",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
            {
              mayorigual_12Senanas_igG: "mayorigual_12Senanas_igG",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
            {
              primera_consulta_igM: "primera_consulta_igM",
              negativo: false,
              positivo: false,
              noSehizo: false,
            },
          ]);

          setSuplementoIncial([
            {
              suplemento: "suplemento",
              fe: false,
              folatos: false,
              multi_vitaminas: false,
            },
          
          ]);
           setChangas([
            {
              changas: "",
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
              menor12Semanas: "menor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
            {
              mayor12Semanas: "mayor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
          
          
          ]);

          setVIHSegundaPrueba([
            {
              menor12Semanas: "menor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
            {
              mayor12Semanas: "mayor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tarv_enEmbarazo: "",
            },
          
          ]);

          setSifilisPrimeraPrueba([
            {
              menor12Semanas: "menor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
            },
            {
              mayor12Semanas: "mayor12Semanas",
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
              menor12Semanas: "menor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
            },
            {
              mayor12Semanas: "mayor12Semanas",
              si: false,
              no: false,
              nc: false,
              result: "",
              tratamientoCon_Penisilina: "",
              TtoDeLa_Pareja: false,
              AnomaliasPrenatales: false,
            },
          
          ]);
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
      <h2>Gestacion Actual</h2>
      <form className="formFourthModule" onSubmit={handleSubmit}>
        <div className="formularioFourthModule">
          <div className="formularioFourthChildren">
            <label>Peso</label>
            <input
              className="inputNumberFourth"
              type="number"
              step="0.1"
              value={pesoAnterior}
              onChange={(e) => setPesoAnterior(e.target.value)}
              placeholder="(Kg)"
            />
          </div>
          <div className="formularioFourthChildren">
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

          <div className="formularioFourthChildren">
            <label htmlFor="multi-last-name">IMC:</label>
            <input
              className="inputNumberFourth"
              type="number"
              step="0.01"
              required
              value={imc}
              readOnly
            />
          </div>
          <div className="formularioFourthChildren">
            <label htmlFor="multi-last-name">FUM</label>
            <input
              className="inputNumberFourth"
              type="date"
              value={DateFUM}
              onChange={(e) => setDateFUM(e.target.value)}
            />
          </div>
          <div className="formularioFourthChildren">
            <label htmlFor="multi-last-name">FPP</label>
            <input
              className="inputNumberFourth"
              type="date"
              value={DateFPP}
              onChange={(e) => setDateFPP(e.target.value)}
            />
          </div>
          <div className="formularioFourthChildren">
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
          <div className="formularioFourthChildren">
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                {`Trimestre ${index + 1}`}
              </div>
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label htmlFor="multi-last-name">Previa</label>

                <Switch
                  id={`previa${index}`}
                  checked={item.previa === "si"}
                  onChange={(newValue) =>
                    handleAntirubeola(index, "previa", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor="multi-last-name">Embarazo</label>
                <Switch
                  checked={item.embarazo === "si"}
                  onChange={(newValue) =>
                    handleAntirubeola(index, "embarazo", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor="multi-last-name">No sabe</label>
                <Switch
                  checked={item.noSabe === "si"}
                  onChange={(newValue) =>
                    handleAntirubeola(index, "noSabe", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor="multi-last-name">No</label>
                <Switch
                  checked={item.no === "si"}
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label htmlFor={`Odont${item}`}>ODONT</label>
                <Switch
                  id={`Odont${item}`}
                  checked={item.Odont === "si"}
                  onChange={(newValue) =>
                    handleExNormal(index, "Odont", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`Mamas${item}`}>MAMÁS</label>
                <Switch
                  id={`Mamas${item}`}
                  checked={item.Mamas === "si"}
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>{item[item.InspVisual || item.PAP || item.COLP]}</label>
              </div>
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <h2>Grupos</h2>
              </div>
              <div className="formularioFourthChildren">
                <label> RH</label>
                <select
                  className="inputNumberFourth"
                  value={item.RH}
                  onChange={(e) => handleGrupoA(index, "RH", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label>inmuniz</label>
                <Switch
                  checked={item.imuniz == true}
                  onChange={(value) => handleGrupoA(index, "imuniz", value)}
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label> yglobulina_anti_D</label>
                <select
                  className="inputNumberFourth"
                  value={item.yglobulina_anti_D}
                  onChange={(e) =>
                    handleGrupoA(index, "yglobulina_anti_D", e.target.value)
                  }
                >
                  <option>Opciones</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                  <option value="n/c">N/C</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {/* toxoplasmosis */}
        <div className="formularioFourthChildren">
          <h2>Toxoplasnosis</h2>
        </div>
        {Toxoplasnosis.map((trimestre, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>
                  {
                    trimestre[
                      trimestre.menor12Senanas_igG ||
                        trimestre.mayorigual_12Senanas_igG ||
                        trimestre.primera_consulta_igM
                    ]
                  }
                </label>
              </div>
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <h2>Suplementos</h2>
              </div>
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
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
              <div className="formularioFourthChildren">
                <label>MultiVitaminas</label>
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

        {/* CHANGAS */}
        {Changas.map((item, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <h2>Changas</h2>
              </div>
              <div className="formularioFourthChildren">
                <label>Changas</label>
                <select
                  className="inputNumberFourth"
                  value={item.changas}
                  onChange={(e) => handleChangas(index, "changas", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="-">-</option>
                  <option value="+">+</option>
                  <option value="No se hizo">No se hizo</option>
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label>Paludismo malaria</label>
                <select
                  className="inputNumberFourth"
                  value={item.paludismo_malaria}
                  onChange={(e) => handleChangas(index, "paludismo_malaria", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="-">-</option>
                  <option value="+">+</option>
                  <option value="No se hizo">No se hizo</option>
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label> Bacteriuria</label>
                <select
                  className="inputNumberFourth"
                  value={item.bacteriuria}
                  onChange={(e) => handleChangas(index, "bacteriuria", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="Normal">Normal</option>
                  <option value="Anormal">Anormal</option>
                  <option value="No se hizo">No se hizo</option>
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label> Glusemia en ayuna</label>
                <select
                  className="inputNumberFourth"
                  value={item.glusemia_EnAyuna}
                  onChange={(e) => handleChangas(index, "glusemia_EnAyuna", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="Mayor a 20 semanas">Mayor a 20 semanas</option>
                  <option value="Menor a 20 semanas">Menor a 20 semanas</option>
                
                </select>
              </div>

              <div className="formularioFourthChildren">
                <label>Estreptococo</label>
                <select
                  className="inputNumberFourth"
                  value={item.estreptococo}
                  onChange={(e) => handleChangas(index, "estreptococo", e.target.value)}
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
            <div className="formularioFourthModule">
            <div className="formularioFourthChildren">
            <h3>CONSEJERIA</h3>
            </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`PreparacionParto${item}`}>PreparacionParto</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`PlanificacionFamiliar${item}`}>Planificacion Familiar</label>
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

              <div className="formularioFourthChildren">
                <label htmlFor={`LactanciaMaterna${item}`}>Lactancia Materna</label>
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

              <div className="formularioFourthChildren">
                <label htmlFor={`AmorPara_Chiquitos${item}`}>Amor Para los mas Chiquitos</label>
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
        <div className="formularioFourthChildren">
          <h2>VIH Primera prueba solicitada</h2>
        </div>
        {VIHPrimeraPrueba.map((trimestre, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>
                  {
                    trimestre[
                      trimestre.menor12Semanas ||
                        trimestre.mayor12Semanas
                    ]
                  }
                </label>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`si${index}`}>si</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`no${index}`}>no</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`nc${index}`}>n/c</label>
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
              <div className="formularioFourthChildren">
                <label>Resultado</label>
                <select
                  className="inputNumberFourth"
                  value={trimestre.result}
                  onChange={(e) => handleVIHPrimeraPrueba(index, "result", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="n/c">n/c</option>
                  <option value="s/d">s/d</option>
                
                </select>
              </div>

              <div className="formularioFourthChildren">
                <label>TARV en Embarazo</label>
                <select
                  className="inputNumberFourth"
                  value={trimestre.tarv_enEmbarazo}
                  onChange={(e) => handleVIHPrimeraPrueba(index, "tarv_enEmbarazo", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="n/c">n/c</option>
          
                </select>
              </div>
            </div>
          </div>
        ))}

         {/* VIH Segunda prueba solicitada */}
         <div className="formularioFourthChildren">
          <h2>VIH Segunda prueba solicitada</h2>
        </div>
        {VIHSegundaPrueba.map((trimestre, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>
                  {
                    trimestre[
                      trimestre.menor12Semanas ||
                        trimestre.mayor12Semanas
                    ]
                  }
                </label>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`si${index}`}>si</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`no${index}`}>no</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`nc${index}`}>n/c</label>
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
              <div className="formularioFourthChildren">
                <label>Resultado</label>
                <select
                  className="inputNumberFourth"
                  value={trimestre.result}
                  onChange={(e) => handleVIHPSegundaPrueba(index, "result", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="n/c">n/c</option>
                  <option value="s/d">s/d</option>
                
                </select>
              </div>

              <div className="formularioFourthChildren">
                <label>TARV en Embarazo</label>
                <select
                  className="inputNumberFourth"
                  value={trimestre.tarv_enEmbarazo}
                  onChange={(e) => handleVIHPSegundaPrueba(index, "tarv_enEmbarazo", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="n/c">n/c</option>
          
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* Sifilis Primera prueba solicitada */}
        <div className="formularioFourthChildren">
          <h2> Sifilis Primera prueba solicitada</h2>
        </div>
        {SifilisPrimeraPrueba.map((item, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>
                  {
                    item[
                      item.menor12Semanas ||
                      item.mayor12Semanas
                    ]
                  }
                </label>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`si${index}`}>si</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`no${index}`}>no</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`nc${index}`}>n/c</label>
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
              <div className="formularioFourthChildren">
                <label>Resultado</label>
                <select
                  className="inputNumberFourth"
                  value={item.result}
                  onChange={(e) => handleSifilisPrimeraPrueba(index, "result", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="n/c">n/c</option>
                  <option value="s/d">s/d</option>
                
                </select>
              </div>

              <div className="formularioFourthChildren">
                <label>TARV en Embarazo</label>
                <select
                  className="inputNumberFourth"
                  value={item.tratamientoCon_Penisilina}
                  onChange={(e) => handleSifilisPrimeraPrueba(index, "tratamientoCon_Penisilina", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="n/c">n/c</option>
          
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`TtoDeLa_Pareja${index}`}>Tto De la Pareja</label>
                <Switch
                  id={`TtoDeLa_Pareja${index}`}
                  checked={item.TtoDeLa_Pareja === true}
                  onChange={(newValue) =>
                    handleSifilisPrimeraPrueba(index, "TtoDeLa_Pareja", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Sifilis Segunda prueba solicitada */}
        <div className="formularioFourthChildren">
          <h2> Sifilis Segunda prueba solicitada</h2>
        </div>
        {SifilisSegundaPrueba.map((item, index) => (
          <div key={index}>
            <div className="formularioFourthModule">
              <div className="formularioFourthChildren">
                <label>
                  {
                    item[
                      item.menor12Semanas ||
                      item.mayor12Semanas
                    ]
                  }
                </label>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`si${index}`}>si</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`no${index}`}>no</label>
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
              <div className="formularioFourthChildren">
                <label htmlFor={`nc${index}`}>n/c</label>
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
              <div className="formularioFourthChildren">
                <label>Resultado</label>
                <select
                  className="inputNumberFourth"
                  value={item.result}
                  onChange={(e) => handleSifilisSegundaPrueba(index, "result", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="n/c">n/c</option>
                  <option value="s/d">s/d</option>
                
                </select>
              </div>

              <div className="formularioFourthChildren">
                <label>TARV en Embarazo</label>
                <select
                  className="inputNumberFourth"
                  value={item.tratamientoCon_Penisilina}
                  onChange={(e) => handleSifilisSegundaPrueba(index, "tratamientoCon_Penisilina", e.target.value)}
                >
                  <option>Opciones</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="n/c">n/c</option>
          
                </select>
              </div>
              <div className="formularioFourthChildren">
                <label htmlFor={`TtoDeLa_Pareja${index}`}>Tto De la Pareja</label>
                <Switch
                  id={`TtoDeLa_Pareja${index}`}
                  checked={item.TtoDeLa_Pareja === true}
                  onChange={(newValue) =>
                    handleSifilisSegundaPrueba(index, "TtoDeLa_Pareja", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>

              <div className="formularioFourthChildren">
                <label htmlFor={`AnomaliasPrenatales${index}`}>Anomalias prenatales</label>
                <Switch
                  id={`AnomaliasPrenatales${index}`}
                  checked={item.AnomaliasPrenatales === true}
                  onChange={(newValue) =>
                    handleSifilisSegundaPrueba(index, "AnomaliasPrenatales", newValue)
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
          <div key={index}>
            <div className="cita-form">
              <div className="form-group">
                <label>Fecha</label>
                <input
                  className="text"
                  type="date"
                  value={atencion.fecha}
                  onChange={(e) =>
                    handleAtencionesPrenatales(index, "fecha", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Edad Gestacional</label>
                <input
                  className="text"
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
              <div className="form-group">
                <label>Peso</label>
                <input
                  className="text"
                  type="number"
                  value={atencion.peso}
                  onChange={(e) =>
                    handleAtencionesPrenatales(index, "peso", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>PA</label>
                <input
                  className="text"
                  type="text"
                  value={atencion.PA}
                  onChange={(e) =>
                    handleAtencionesPrenatales(index, "PA", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="cita-form">
              <div className="form-group">
                <label>Alture Uterina</label>
                <input
                  className="text"
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

              <div className="form-group">
                <label>Presentacion</label>
                <input
                  className="text"
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label>Proxima Cita</label>
                <input
                  className="text"
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
              <div className="form-group">
                <label>Signos, Examenes Tratamiento</label>
                <textarea
                  className="textAreaAtenciones"
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

SecondModuleScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default SecondModuleScreen;
