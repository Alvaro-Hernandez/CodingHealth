import NavBarComponent from "../components/NavbarComponent";
import { useState, useEffect } from "react";
import { db } from "../services/FirebaseServices";
import "../styles/secondModuleStyle.css";

const SecondModuleScreen = () => {
  const [pesoAnterior, setPesoAnterior] = useState("");
  const [talla, setTalla] = useState("");
  const [imc, setIMC] = useState("");
  //Fechas de FUM Y FPP
  const [DateFUM, setDateFUM] = useState("");
  const [DateFPP, setDateFPP] = useState("");

  const [selectedOptionFUM, setSelectedOptionFUM] = useState(""); // Estado para la opción seleccionada
  const [selectedOptionECO, setSelectedOptionECO] = useState(""); // Estado para la opción seleccionada

  const [loader, setLoader] = useState(false); //Recargar boton guardar

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

  //Funcion para calcular el IMC automatico
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

  // Boton submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    setLoader(true);

    //Añade la colecciones de datos a la coleccion Gestacion
    db.collection("GestacionActualizado")
      .add({
        pesoAnterior: pesoAnterior,
        talla: talla,
        imc: imc,
        DateFUM: DateFUM,
        DateFPP: DateFPP,
        selectedOptionFUM: selectedOptionFUM, // Agregar la opción seleccionada
        selectedOptionECO: selectedOptionECO, // Agregar la opción seleccionada

        trimestresData: trimestresData,
        Antirubeola: Antirubeola,
        Antitetanica: Antitetanica,
        ExNormal: ExNormal,
        Cervix: Cervix,
      })
      .then(() => {
        setLoader(false);
        alert("ENVIADO CORRECTAMENTE👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

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
  };

  return (
    <div>
      <NavBarComponent />

      <section>
        <div className="form-container">
          <h1 className="nombre">Modulo Gestación Actual 🤳</h1>

          {/* Comienzo del Formulario */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="containerPrincipal">
              <div className="row-container">
                <div className="column">
                  <div className="peso-anterior-container">
                    <label>PesoAnterior</label>
                    <input
                      type="number"
                      step="0.1"
                      value={pesoAnterior}
                      onChange={(e) => setPesoAnterior(e.target.value)}
                      placeholder="(Kg)"
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="talla">
                    <label>Talla (m):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={talla}
                      onChange={(e) => setTalla(e.target.value)}
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="pesoIMC">
                    <label>IMC:</label>
                    <input type="number" step="0.01" value={imc} readOnly />
                  </div>
                </div>
                <div className="column">
                  <div className="fechaFUM">
                    <label>Fecha FUM:</label>
                    <input
                      type="date"
                      value={DateFUM}
                      onChange={(e) => setDateFUM(e.target.value)}
                    />
                    <div className="fechaFPP">
                      <label>Fecha FPP:</label>
                      <input
                        type="date"
                        value={DateFPP}
                        onChange={(e) => setDateFPP(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="fechaFPP">
                    <label htmlFor="radioSiECO">ECO menos 20 s</label>
                    <label
                      className={`opcion ${selectedOptionECO === "si" ? "seleccionado" : ""
                        }`}
                      onClick={() => setSelectedOptionECO("si")}
                    >
                      <input
                        type="radio"
                        id="radioSiECO"
                        name="opcionECO"
                        value="si"
                        checked={selectedOptionECO === "si"}
                        onChange={() => { }}
                      />
                      <div className="circulo"></div>{" "}
                      {/* Agregar un div para el círculo */}
                      Sí
                    </label>
                    <label
                      htmlFor="radioNoECO"
                      className={`opcion ${selectedOptionECO === "no" ? "seleccionado" : ""
                        }`}
                      onClick={() => setSelectedOptionECO("no")}
                    >
                      <input
                        type="radio"
                        id="radioNoECO"
                        name="opcionECO"
                        value="no"
                        checked={selectedOptionECO === "no"}
                        onChange={() => { }}
                      />
                      <div className="circulo"></div>{" "}
                      {/* Agregar un div para el círculo */}
                      No
                    </label>
                  </div>
                </div>
                <div className="column">
                  <div className="fechaFPP">
                    <label>EG CONFIABLE por</label>
                    <label>FUM</label>
                    <label
                      className={`opcion ${selectedOptionFUM === "si" ? "seleccionado" : ""
                        }`}
                      onClick={() => setSelectedOptionFUM("si")}
                    >
                      <input
                        type="radio"
                        name="opcionEG"
                        value="si"
                        checked={selectedOptionFUM === "si"}
                        onChange={() => { }}
                      />
                      <div className="circulo"></div>{" "}
                      {/* Agregar un div para el círculo */}
                      Sí
                    </label>
                    <label
                      className={`opcion ${selectedOptionFUM === "no" ? "seleccionado" : ""
                        }`}
                      onClick={() => setSelectedOptionFUM("no")}
                    >
                      <input
                        type="radio"
                        name="opcionEG"
                        value="no"
                        checked={selectedOptionFUM === "no"}
                        onChange={() => { }}
                      />
                      <div className="circulo"></div>{" "}
                      {/* Agregar un div para el círculo */}
                      No
                    </label>
                  </div>
                </div>

              </div>

              <div className="table-container">
                {trimestresData.map((trimestre, index) => (
                  <div className="table-row" key={index}>
                    <div className="trimestre-cell">{`Trimestre ${index + 1
                      }`}</div>
                    <div className="data-cell">
                      <div className="data-item">
                        <label>Fuma PAS</label>
                        <div
                          className={`opcion ${trimestre.fumaPas === "si" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "fumaPas", "si")
                          }
                        >
                          <div className="circulo"></div> Sí
                        </div>
                        <div
                          className={`opcion ${trimestre.fumaPas === "no" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "fumaPas", "no")
                          }
                        >
                          <div className="circulo"></div> No
                        </div>
                      </div>
                      <div className="data-item">
                        <label>Fuma ACT</label>
                        <div
                          className={`opcion ${trimestre.fumaAct === "si" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "fumaAct", "si")
                          }
                        >
                          <div className="circulo"></div> Sí
                        </div>
                        <div
                          className={`opcion ${trimestre.fumaAct === "no" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "fumaAct", "no")
                          }
                        >
                          <div className="circulo"></div> No
                        </div>
                      </div>
                      <div className="data-item">
                        <label>Droga</label>
                        <div
                          className={`opcion ${trimestre.droga === "si" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "droga", "si")
                          }
                        >
                          <div className="circulo"></div> Sí
                        </div>
                        <div
                          className={`opcion ${trimestre.droga === "no" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "droga", "no")
                          }
                        >
                          <div className="circulo"></div> No
                        </div>
                      </div>
                      <div className="data-item">
                        <label>Alcohol</label>
                        <div
                          className={`opcion ${trimestre.alcohol === "si" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "alcohol", "si")
                          }
                        >
                          <div className="circulo"></div> Sí
                        </div>
                        <div
                          className={`opcion ${trimestre.alcohol === "no" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "alcohol", "no")
                          }
                        >
                          <div className="circulo"></div> No
                        </div>
                      </div>
                      <div className="data-item">
                        <label>Violencia</label>
                        <div
                          className={`opcion ${trimestre.violencia === "si" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "violencia", "si")
                          }
                        >
                          <div className="circulo"></div> Sí
                        </div>
                        <div
                          className={`opcion ${trimestre.violencia === "no" ? "seleccionado" : ""
                            }`}
                          onClick={() =>
                            handleTrimestreChange(index, "violencia", "no")
                          }
                        >
                          <div className="circulo"></div> No
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Esto es para ANTIRUBEOLA */}

            <div className="column">
              <div>ANTIRUBEOLA</div>
              {Antirubeola.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="data-cell">
                    <div className="data-item">
                      <label>Previa</label>
                      <div
                        className={`opcion ${item.previa === "previa" ? "seleccionado" : ""
                          }`}
                        onClick={() =>
                          handleAntirubeola(index, "previa", "previa")
                        }
                      >
                        <div className="circulo"></div>
                      </div>

                      <label>Embarazo</label>
                      <div
                        className={`opcion ${item.embarazo === "embarazo" ? "seleccionado" : ""
                          }`}
                        onClick={() =>
                          handleAntirubeola(index, "embarazo", "embarazo")
                        }
                      >
                        <div className="circulo"></div>
                      </div>
                    </div>
                    <div className="data-item">
                      <label>No sabe</label>
                      <div
                        className={`opcion ${item.noSabe === "noSabe" ? "seleccionado" : ""
                          }`}
                        onClick={() =>
                          handleAntirubeola(index, "noSabe", "noSabe")
                        }
                      >
                        <div className="circulo"></div>
                      </div>

                      <label>No</label>
                      <div
                        className={`opcion ${item.no === "no" ? "seleccionado" : ""
                          }`}
                        onClick={() => handleAntirubeola(index, "no", "no")}
                      >
                        <div className="circulo"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Esta es la tabla de Antitetanica */}
            <div className="table-container">
              <div className="EstiloEnfer-medades">Antitectanica</div>
              <table>
                <tbody>
                  {Antitetanica.map((detalle, index) => (
                    <tr key={index}>
                      <td>
                        <label>Vigente</label>
                        <select
                          value={detalle.vigente}
                          onChange={(e) =>
                            handleAntitetanica(index, "vigente", e.target.value)
                          }
                        >
                          <option value="">Vigente</option>
                          <option value="Si">Si</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                      {detalle.vigente === "Si" && (
                        <tr>
                          <td>
                            <label>Dosis 1</label>
                            <input
                              type="text"
                              name={`posicion_${index}`}
                              onChange={(e) =>
                                handleAntitetanica(
                                  index,
                                  "Dosis1",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <label>Dosis 2</label>
                            <input
                              type="text"
                              name={`posicion_${index}`}
                              onChange={(e) =>
                                handleAntitetanica(
                                  index,
                                  "Dosis2",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Esta tabla es para EXNORMAL */}

            <div className="table-container">

              {ExNormal.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="trimestre-cell">ExNormal</div>
                  <div className="data-cell">
                    <div className="data-item">
                      <label>ODONT</label>
                      <div
                        className={`opcion ${item.Odont === "si" ? "seleccionado" : ""
                          }`}
                        onClick={() => handleExNormal(index, "Odont", "si")}
                      >
                        <div className="circulo"></div> Sí
                      </div>
                      <div
                        className={`opcion ${item.Odont === "no" ? "seleccionado" : ""
                          }`}
                        onClick={() => handleExNormal(index, "Odont", "no")}
                      >
                        <div className="circulo"></div> No
                      </div>
                    </div>

                    <div className="data-item">
                      <label>MAMAS</label>
                      <div
                        className={`opcion ${item.Mamas === "si" ? "seleccionado" : ""
                          }`}
                        onClick={() => handleExNormal(index, "Mamas", "si")}
                      >
                        <div className="circulo"></div> Sí
                      </div>
                      <div
                        className={`opcion ${item.Mamas === "no" ? "seleccionado" : ""
                          }`}
                        onClick={() => handleExNormal(index, "Mamas", "no")}
                      >
                        <div className="circulo"></div> No
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="table-container">
              {Cervix.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="data-item">
                    <label>
                      {item[item.InspVisual || item.PAP || item.COLP]}
                    </label>
                  </div>
                  <div className="trimestre-cell"></div>

                  <div className="data-cell">
                    <div className="data-item">
                      <div
                        className={`opcion ${Cervix[index].normal === "normal"
                          ? "seleccionado"
                          : ""
                          }`}
                        onClick={() => handleCervix(index, "normal", "normal")}
                      >
                        <div className="circulo"></div> Normal
                      </div>
                    </div>
                    <div className="data-item">
                      <div
                        className={`opcion ${Cervix[index].anormal === "anormal"
                          ? "seleccionado"
                          : ""
                          }`}
                        onClick={() =>
                          handleCervix(index, "anormal", "anormal")
                        }
                      >
                        <div className="circulo"></div> Anormal
                      </div>
                    </div>
                    <div className="data-item">
                      <div
                        className={`opcion ${Cervix[index].noSeHizo === "noSeHizo"
                          ? "seleccionado"
                          : ""
                          }`}
                        onClick={() =>
                          handleCervix(index, "noSeHizo", "noSeHizo")
                        }
                      >
                        <div className="circulo"></div> No se hizo
                      </div>
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
  );
};

export default SecondModuleScreen;
