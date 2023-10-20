import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import "../styles/secondModuleStyle.css";

const SecondModuleScreen = ({ onSignOut }) => {
  const [, setLocation] = useLocation();
  const [pesoAnterior, setPesoAnterior] = useState("");
  const [talla, setTalla] = useState("");
  const [imc, setIMC] = useState("");
  const [DateFUM, setDateFUM] = useState("");
  const [DateFPP, setDateFPP] = useState("");
  const [selectedOptionFUM, setSelectedOptionFUM] = useState("");
  const [selectedOptionECO, setSelectedOptionECO] = useState("");
  const [loader, setLoader] = useState(false);
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

  const handleCervix = (index, field, value) => {
    const updatedCervix = [...Cervix];
    updatedCervix[index][field] = value;
    setCervix(updatedCervix);
  };

  const handleExNormal = (index, field, value) => {
    const updatedExNormal = [...ExNormal];
    updatedExNormal[index][field] = value;
    setExNormal(updatedExNormal);
  };

  const handleAntitetanica = (index, field, value) => {
    const updatedAntitetanica = [...Antitetanica];
    updatedAntitetanica[index][field] = value;
    setAntitetanica(updatedAntitetanica);
  };

  const handleAntirubeola = (index, field, value) => {
    const updatedAntirubeola = [...Antirubeola];
    updatedAntirubeola[index][field] = value;
    setAntirubeola(updatedAntirubeola);
  };
  const handleTrimestreChange = (index, field, value) => {
    const updatedTrimestresData = [...trimestresData];
    updatedTrimestresData[index][field] = value;
    setTrimestresData(updatedTrimestresData);
  };

  const handleAtencionesPrenatales = (index, field, value) => {
    const updatedAtencionesPrenatales = [...AtencionesPrenatales];
    updatedAtencionesPrenatales[index][field] = value;
    setAtencionesPrenatales(updatedAtencionesPrenatales);
  };

  useEffect(() => {
    calcularIMC();
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

          Alert("Datos enviados con exito");

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

  return (
    <div className="secondModuleScreenContainer">
      <div className="navContainerSecond">
        <NavBarComponent onSignOut={handleLogout} />
      </div>
      <div className="formControlSecond">
        <section className="sectionFormSecond">
          <form onSubmit={handleSubmit}>
            <legend>Gestación Actual</legend>

            <div className="inputContainerSecond">
              <div className="inputFieldSecond">
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
              <div className="inputFieldSecond">
                <label>Talla</label>
                <input
                  className="inputNumberSecond"
                  type="number"
                  step="0.01"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  placeholder="(m)"
                />
              </div>
              <div className="inputFieldSecond">
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
              <div className="inputFieldSecond">
                <label htmlFor="multi-last-name">FUM</label>
                <input
                  className="inputDateSecond"
                  type="date"
                  value={DateFUM}
                  onChange={(e) => setDateFUM(e.target.value)}
                />
              </div>
              <div className="inputFieldSecond">
                <label htmlFor="multi-last-name">FPP</label>
                <input
                  className="inputDateSecond"
                  type="date"
                  value={DateFPP}
                  onChange={(e) => setDateFPP(e.target.value)}
                />
              </div>
              <div className="inputToggerSecond">
                <div className="opcion">
                  <label htmlFor="multi-last-Eco">ECOmenor20s</label>
                  <ToggleSwitch
                    className="pure-u-23-24"
                    checked={selectedOptionECO === "si"}
                    onChange={(newValue) =>
                      setSelectedOptionECO(newValue ? "si" : "no")
                    }
                  />
                </div>
              </div>
              <div className="inputToggerSecond">
                <div className="opcion">
                  <label htmlFor="multi-last-name">FUM</label>
                  <ToggleSwitch
                    className="pure-u-23-24"
                    checked={selectedOptionFUM === "si"}
                    onChange={(newValue) =>
                      setSelectedOptionFUM(newValue ? "si" : "no")
                    }
                  />
                </div>
              </div>

              <div className="input-container-trimestre">
                {trimestresData.map((trimestre, index) => (
                  <div className="table-row" key={index}>
                    <div className="trimestre-cell">{`Trimestre ${
                      index + 1
                    }`}</div>
                    <div className="data-cell">
                      <div className="input-togger-trimestre">
                        <label htmlFor={`fumaPas${index}`}>FumaPAS</label>
                        <ToggleSwitch
                          id={`fumaPas${index}`}
                          checked={trimestre.fumaPas === "si"}
                          onChange={(newValue) =>
                            handleTrimestreChange(index, "fumaPas", newValue)
                          }
                        />
                      </div>
                      <div className="input-togger-trimestre">
                        <label htmlFor={`fumaAct${index}`}>FumaACT</label>
                        <ToggleSwitch
                          id={`fumaAct${index}`}
                          checked={trimestre.fumaAct === "si"}
                          onChange={(newValue) =>
                            handleTrimestreChange(index, "fumaAct", newValue)
                          }
                        />
                      </div>
                      <div className="input-togger-trimestre">
                        <label htmlFor={`droga${index}`}>DROGA</label>
                        <ToggleSwitch
                          id={`droga${index}`}
                          checked={trimestre.droga === "si"}
                          onChange={(newValue) =>
                            handleTrimestreChange(index, "droga", newValue)
                          }
                        />
                      </div>
                      <div className="input-togger-trimestre">
                        <label htmlFor={`alcohol${index}`}>ALCOHOL</label>
                        <ToggleSwitch
                          id={`alcohol${index}`}
                          checked={trimestre.alcohol === "si"}
                          onChange={(newValue) =>
                            handleTrimestreChange(index, "alcohol", newValue)
                          }
                        />
                      </div>
                      <div className="input-togger-trimestre">
                        <label htmlFor={`violencia${index}`}>VIOLENCIA</label>
                        <ToggleSwitch
                          id={`violencia${index}`}
                          checked={trimestre.violencia === "si"}
                          onChange={(newValue) =>
                            handleTrimestreChange(index, "violencia", newValue)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
              <div className="input-container-antirubeola">
                <label>ANTIRUBEOLA</label>
                <div className="row-container">
                  {Antirubeola.map((item, index) => (
                    <div className="column" key={index}>
                      <div className="data-item-antirubeola">
                        <div className="input-field-antirubeola">
                          <label htmlFor="multi-last-name">Previa</label>
                          <ToggleSwitch
                            checked={item.previa === "previa"}
                            onChange={(newValue) =>
                              handleAntirubeola(
                                index,
                                "previa",
                                newValue ? "previa" : ""
                              )
                            }
                          />
                          <label htmlFor="multi-last-name">Embarazo</label>
                          <ToggleSwitch
                            checked={item.embarazo === "embarazo"}
                            onChange={(newValue) =>
                              handleAntirubeola(
                                index,
                                "embarazo",
                                newValue ? "embarazo" : ""
                              )
                            }
                          />
                          <label htmlFor="multi-last-name">No sabe</label>
                          <ToggleSwitch
                            checked={item.noSabe === "noSabe"}
                            onChange={(newValue) =>
                              handleAntirubeola(
                                index,
                                "noSabe",
                                newValue ? "noSabe" : ""
                              )
                            }
                          />
                          <label htmlFor="multi-last-name">No</label>
                          <ToggleSwitch
                            checked={item.no === "no"}
                            onChange={(newValue) =>
                              handleAntirubeola(
                                index,
                                "no",
                                newValue ? "no" : ""
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="input-container-antitectanica">
                        <label> ANTITECTANICA </label>
                        {Antitetanica.map((detalle, index) => (
                          <div key={index}>
                            <select
                              className="inputSelect"
                              value={detalle.vigente}
                              onChange={(e) =>
                                handleAntitetanica(
                                  index,
                                  "vigente",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Vigente</option>
                              <option value="Si">Si</option>
                              <option value="No">No</option>
                            </select>
                            {detalle.vigente === "Si" && (
                              <div className="input-field-antitectanica">
                                <label> Dosis 1 </label>
                                <input
                                  className="inputDosis"
                                  type="number"
                                  name={`posicion_${index}`}
                                  onChange={(e) =>
                                    handleAntitetanica(
                                      index,
                                      "Dosis1",
                                      e.target.value
                                    )
                                  }
                                />
                                <label> Dosis 2 </label>
                                <input
                                  className="inputDosis"
                                  type="number"
                                  name={`posicion_${index}`}
                                  onChange={(e) =>
                                    handleAntitetanica(
                                      index,
                                      "Dosis2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="input-field-exNormal">
                  <label className="exNormal">EX NORMAL</label>
                  <div className="row-container">
                    {ExNormal.map((item, index) => (
                      <div className="row-item" key={index}>
                        <div className="input-togger-exNormal">
                          <label htmlFor={`Odont${item}`}>ODONT</label>
                          <ToggleSwitch
                            id={`Odont${item}`}
                            checked={ExNormal.Odont === "si"}
                            onChange={(newValue) =>
                              handleExNormal(index, "Odont", newValue)
                            }
                          />
                        </div>
                        <div className="input-togger">
                          <label htmlFor={`Mamas${item}`}>MAMÁS</label>
                          <ToggleSwitch
                            id={`Mamas${item}`}
                            checked={ExNormal.Mamas === "si"}
                            onChange={(newValue) =>
                              handleExNormal(index, "Mamas", newValue)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* CERVIX */}
              <div className="table-container-cervix">
                {Cervix.map((item, index) => (
                  <div className="table-row-cervix" key={index}>
                    <div className="data-item-cervix">
                      <label>
                        {item[item.InspVisual || item.PAP || item.COLP]}
                      </label>
                    </div>
                    <div className="cervix-cell"></div>
                    <div className="data-cell-cervix">
                      <div className="input-togger-cervix">
                        <label htmlFor={`normal${index}`}>Normal</label>
                        <ToggleSwitch
                          id={`normal${index}`}
                          checked={item.normal === "normal"}
                          onChange={() =>
                            handleCervix(index, "normal", "normal")
                          }
                        />
                      </div>
                      <div className="input-togger-cervix">
                        <label htmlFor={`anormal${index}`}>Anormal</label>
                        <ToggleSwitch
                          id={`anormal${index}`}
                          checked={item.anormal === "anormal"}
                          onChange={() =>
                            handleCervix(index, "anormal", "anormal")
                          }
                        />
                      </div>
                      <div className="input-togger-cervix">
                        <label htmlFor={`noSeHizo${index}`}>No se hizo</label>
                        <ToggleSwitch
                          id={`noSeHizo${index}`}
                          checked={item.noSeHizo === "noSeHizo"}
                          onChange={() =>
                            handleCervix(index, "noSeHizo", "noSeHizo")
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="table-container">
                <table className="tableAtenciones">
                  <thead>
                    <tr className="trAtenciones">
                      <th className="thAtenciones">Fecha</th>
                      <th className="thAtenciones">Edad Gestacional</th>
                      <th className="thAtenciones">Peso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AtencionesPrenatales.map((atencion, index) => (
                      <tr className="trAtenciones" key={index}>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="tableAtenciones">
                  <thead className="theadAtenciones">
                    <tr className="trAtenciones">
                      <th className="thAtenciones">PA</th>
                      <th className="thAtenciones">Altura Uterina</th>
                      <th className="thAtenciones">Presentación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AtencionesPrenatales.map((atencion, index) => (
                      <tr className="trAtenciones" key={index}>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
                            type="text"
                            value={atencion.presentacion}
                            onChange={(e) =>
                              handleAtencionesPrenatales(
                                index,
                                "presentación",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="tableAtenciones">
                  <thead className="theadAtenciones">
                    <tr className="trAtenciones">
                      <th className="thAtenciones">FCF/IPM</th>
                      <th className="thAtenciones">Movimientos Fetales</th>
                      <th className="thAtenciones">Proteinuria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AtencionesPrenatales.map((atencion, index) => (
                      <tr className="trAtenciones" key={index}>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
                            type="text"
                            value={atencion.proteinuna}
                            onChange={(e) =>
                              handleAtencionesPrenatales(
                                index,
                                "proteinuria",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="tableAtenciones">
                  <thead className="theadAtenciones">
                    <tr className="trAtenciones">
                      <th className="thAtenciones">Signos, Exámenes, y Tratamiento</th>
                      <th className="thAtenciones">Iniciales Personal de Salud</th>
                      <th className="thAtenciones">Próxima Cita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AtencionesPrenatales.map((atencion, index) => (
                      <tr className="trAtenciones" key={index}>
                        <td className="tdAtenciones">
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                        <td className="tdAtenciones">
                          <input className="inputTextAtenciones"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="buttonContainerSecond">
              <button type="submit" className="ButtonEnviarSecond">
                Enviar
              </button>
            </div>
          </form>
        </section>
      </div>
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

SecondModuleScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default SecondModuleScreen;
