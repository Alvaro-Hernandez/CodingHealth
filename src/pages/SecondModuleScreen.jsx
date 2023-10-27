import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";

import Switch from 'react-switch';

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
  const cachedId = localStorage.getItem('cachedId');

  const [trimestresData, setTrimestresData] = useState([
    {
      trimestre: "Primer Trimestre",
      fumaPas: "",
      fumaAct: "",
      droga: "",
      alcohol: "",
      violencia: "",
    },
    {
      trimestre: "Segundo Trimestre",
      fumaPas: "",
      fumaAct: "",
      droga: "",
      alcohol: "",
      violencia: "",
    },
    {
      trimestre: "Tercer Trimestre",
      fumaPas: "",
      fumaAct: "",
      droga: "",
      alcohol: "",
      violencia: "",
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

  const handleCervix = (index, field, newValue) => {
    const updatedCervix = [...Cervix];
    updatedCervix[index][field] = newValue ? "si" : "no";
    setCervix(updatedCervix);
  };

  const handleExNormal = (index, field, newValue) => {
    const updatedExNormal = [...ExNormal];
    updatedExNormal[index][field] =  newValue ? "si" : "no";
    setExNormal(updatedExNormal);
  };

  const handleAntirubeola = (index, field, newValue) => {
    const updatedAntirubeola = [...Antirubeola];
    updatedAntirubeola[index][field] = newValue ? "si" : "no";
    setAntirubeola(updatedAntirubeola);
  };
  const handleTrimestreChange = (index, field, newValue) => {
    const updatedTrimestresData = [...trimestresData];
    updatedTrimestresData[index][field] = newValue ? "si" : "no";
    setTrimestresData(updatedTrimestresData);
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
                      const { pesoAnterior,talla,imc,DateFUM,DateFPP,selectedOptionFUM,
                        selectedOptionECO,trimestresData,Antirubeola
                        ,Antitetanica,ExNormal,AtencionesPrenatales, Cervix} = data.ModuloGestacionActual;
                      // Establecer los datos recuperados en el estado
                      setPesoAnterior(pesoAnterior);
                      setTalla(talla);
                      setIMC(imc);
                      setDateFUM(DateFUM);
                      setDateFPP(DateFPP);
                      setSelectedOptionFUM(selectedOptionFUM);
                      setSelectedOptionECO(selectedOptionECO);
                      setTrimestresData(trimestresData);
                      console.log(trimestresData);
                      setAntirubeola(Antirubeola);
                      setAntitetanica(Antitetanica);
                      setExNormal(ExNormal);
                      setCervix(Cervix);
                      setAtencionesPrenatales(AtencionesPrenatales);
                      
                     
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
              fumaPas: "",
              fumaAct: "",
              droga: "",
              alcohol: "",
              violencia: "",
            },
            {
              trimestre: "Segundo Trimestre",
              fumaPas: "",
              fumaAct: "",
              droga: "",
              alcohol: "",
              violencia: "",
            },
            {
              trimestre: "Tercer Trimestre",
              fumaPas: "",
              fumaAct: "",
              droga: "",
              alcohol: "",
              violencia: "",
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
  }

  return (
    <div className="secondModuleScreenContainer">
      <div className="navContainerSecond">
        <NavBarComponent onSignOut={handleLogout} showCloseExpedienteButton={false} />
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
                <label >FUM</label>
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
                              <div >{`Trimestre ${index + 1
                                }`}</div>
                                <div className="formularioFourthModule">
                                    <div className="formularioFourthChildren">
                                    <label htmlFor={`fumaPas${index}`}>FumaPAS</label>
                                      <Switch
                                        id={`fumaPas${index}`}
                                        checked={trimestre.fumaPas === "si"}
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
                                        checked={trimestre.fumaAct === "si"}
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
                                        checked={trimestre.droga === "si"}
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
                                        checked={trimestre.alcohol === "si"}
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
                                        checked={trimestre.violencia === "si"}
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
                                handleAntirubeola(
                                  index,
                                  "embarazo",
                                  newValue 
                                )
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
                                handleAntirubeola(
                                  index,
                                  "noSabe",
                                  newValue 
                                )
                                
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
                                handleAntirubeola(
                                  index,
                                  "no",
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
                                handleExNormal(
                                  index,
                                  "Mamas",
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

                    {/* CERVIX */}
                    <h2>CERVIX</h2>
                    {Cervix.map((item, index) => (
                      <div key={index}>
                        <div className="formularioFourthModule">

                          <div className="formularioFourthChildren">
                            <label>
                              {item[item.InspVisual || item.PAP || item.COLP]}
                            </label>

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
                                handleCervix(
                                  index,
                                  "anormal",
                                  newValue 
                                )
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
                                handleCervix(
                                  index,
                                  "noSeHizo",
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
                          <div key={index}>
                            <div className="cita-form">

                              <div className="form-group">
                                <label >Fecha</label>
                                <input className="text"
                                  type="date"
                                  value={atencion.fecha}
                                  onChange={(e) =>
                                    handleAtencionesPrenatales(
                                      index,
                                      "fecha",
                                      e.target.value
                                    )
                                  }
                                />


                              </div>
                              <div className="form-group">
                              <label >Edad Gestacional</label>
                                <input className="text"
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
                              <label >Peso</label>
                                <input className="text"
                                  type="number"
                                  value={atencion.peso}
                                  onChange={(e) =>
                                    handleAtencionesPrenatales(
                                      index,
                                      "peso",
                                      e.target.value
                                    )
                                  }
                                />

                              </div>
                              <div className="form-group">
                                <label >PA</label>
                                <input className="text"
                                  type="text"
                                  value={atencion.PA}
                                  onChange={(e) =>
                                    handleAtencionesPrenatales(
                                      index,
                                      "PA",
                                      e.target.value
                                    )
                                  }
                                />

                              </div>


                            </div>
                            <div className="cita-form">
                              <div className="form-group">
                              <label >Alture Uterina</label>
                                <input className="text"
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
                                <label >Presentacion</label>
                                <input className="text"
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
                                <input className="text"
                                  type="text"
                                  value={atencion.FCF_IPM}
                                  onChange={(e) =>
                                    handleAtencionesPrenatales(
                                      index,
                                      "FCF_IPM",
                                      e.target.value
                                    )
                                  }
                                />

                              </div>
                              <div className="form-group">
                                <label >Movimiento Fetales</label>
                                <input className="text"
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
                                <label >Proteinuna</label>
                                <input className="text"
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
                                <label >Iniciales Personal salud</label>
                                <input className="text"
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
                                <label >Proxima Cita</label>
                                <input className="text"
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
                                <label >Signos, Examenes Tratamiento</label>
                                <textarea className="textAreaAtenciones"
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
