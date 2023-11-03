import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { db } from "../services/FirebaseServices";
import { departmentsData } from "../utils/departamentsData";
import Switch from "react-switch";
import NavBarComponent from "../components/NavbarComponent";
import ErrorModal from "../components/MessageErrorModal";
import "../styles/firstModuleStyle.css";

const FirstModuleScreen = ({ onSignOut }) => {
  const [, setLocation] = useLocation();
  const cachedId = localStorage.getItem("cachedId");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [DatosAfiliacion, setDatosAfiliacion] = useState([
    {
      Nombres: "",
      Apellidos: "",
      Domicilio: "",
      Municipio_de_Residencia: "",
      Telefono: "",
      Codigo_lugar_Apn: "",
      Nombre_de_Apn: "",
      Codigo_lugar_Parto: "",
      Nombre_US_Parto: "",
      Fecha_Nacimiento: "",
      Edad: "",
      Ednia: "",
      // Alfa_Beta: "",
      Estudios: "",
      Estado_Civil: "",
      Numero_Expediente_Unico: "",
      // Numero_INS: "",
      Numero_Identidad: "",
    },
  ]);

  const [AntecedentesFamiliares, setAntecedenteFamiliares] = useState([
    {
      familiares: "Familiares",
      TBC: false,
      diabetes: "",
      hipertension: false,
      preeclampsia: false,
      eclampsia: false,
      otra_Condicion_Medica: false,
      anomalia_Congenita: false,
    },
  ]);

  const [AntecedentesPersonales, setAntecedentePersonales] = useState([
    {
      personales: "Personales",
      TBC: false,
      diabetes: "",
      hipertension: false,
      preeclampsia: false,
      eclampsia: false,
      otra_Condicion_Medica: false,
      anomalia_Congenita: false,
      Cardiopatia: false,
      infertibilidad: false,
      cirugia_genito_urinaria: false,
      nefropatia: false,
      violencia: false,
      enf_inmunologica: false,
      VIH_positivo: false,
      otros: "",
    },
  ]);

  const handleDatosAfiliacion = (index, field, value) => {
    const updatedDatosAfiliacion = [...DatosAfiliacion];
    updatedDatosAfiliacion[index][field] = value;
    setDatosAfiliacion(updatedDatosAfiliacion);
  };
  const handleAntecedentesFamiliares = (index, field, newValue) => {
    const updatedAntecedentesFamiliares = [...AntecedentesFamiliares];
    updatedAntecedentesFamiliares[index][field] = newValue;
    setAntecedenteFamiliares(updatedAntecedentesFamiliares);
  };

  const handleAntecedentesPersonales = (index, field, newValue) => {
    const updatedAntecedentesPersonales = [...AntecedentesPersonales];
    updatedAntecedentesPersonales[index][field] = newValue;
    setAntecedentePersonales(updatedAntecedentesPersonales);
  };

  const handleLogout = () => {
    onSignOut();
    setLocation("/login");
  };

  //Funcion para validar los campos
  const validateForm = () => {
    const currentData = DatosAfiliacion[0]; // Como solo tienes un elemento en el array

    // Validar campos no vacíos
    for (let field in currentData) {
      if (currentData[field] === "") {
        return `El campo ${field} no puede estar vacío.`;
      }
    }

    // Validar teléfono
    if (currentData.Telefono.length !== 8) {
      return "El número de teléfono debe tener exactamente 8 dígitos.";
    }

    // Validar edad
    if (currentData.Edad < 13 || currentData.Edad > 60) {
      return "La edad debe ser entre 13 y 60 años.";
    }

    return null; // No hay errores
  };

  const handleButtonClick = () => {
    setLocation("/modules");
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setMunicipalities(departmentsData[e.target.value] || []);
  };

  // UseEffect para cargar los datos desde Firebase al montar el componente
  useEffect(() => {
    if (cachedId) {
      try {
        const docRef = db.collection("cartilla").doc(cachedId);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data.ModuloFiliacion) {
              const { DatosAfiliacion, AntecedentesFamiliares,
                AntecedentesPersonales, } = data.ModuloFiliacion;
              // Establecer los datos recuperados en el estado
              setDatosAfiliacion(DatosAfiliacion);
              setAntecedenteFamiliares(AntecedentesFamiliares);
              setAntecedentePersonales(AntecedentesPersonales);
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

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setModalOpen(true);

      return;
    }
    if (cachedId) {
      try {
        const docRef = db.collection("cartilla").doc(cachedId);
        const doc = await docRef.get();

        if (doc.exists) {
          const data = doc.data();
          data.ModuloFiliacion = {
            DatosAfiliacion: DatosAfiliacion,
            AntecedentesFamiliares: AntecedentesFamiliares,
            AntecedentesPersonales: AntecedentesPersonales,
          };

          await docRef.set(data);

          alert("Datos enviados con éxito");
          setDatosAfiliacion([
            {
              Nombres: "",
              Apellidos: "",
              Domicilio: "",
              Municipio_de_Residencia: "",
              Telefono: "",
              Codigo_lugar_Apn: "",
              Nombre_de_Apn: "",
              Codigo_lugar_Parto: "",
              Nombre_US_Parto: "",
              Fecha_Nacimiento: "",
              Edad: "",
              Ednia: "",
              // Alfa_Beta: "",
              Estudios: "",
              Estado_Civil: "",
              Numero_Expediente_Unico: "",
              // Numero_INS: "",
              Numero_Identidad: "",
            },
          ]);
          setAntecedenteFamiliares([
            {
              familiares: "Familiares",
              TBC: false,
              diabetes: "",
              hipertension: false,
              preeclampsia: false,
              eclampsia: false,
              otra_Condicion_Medica: false,
              anomalia_Congenita: false,
            },
          ]);

          setAntecedentePersonales([
            {
              personales: "Personales",
              TBC: false,
              diabetes: "",
              hipertension: false,
              preeclampsia: false,
              eclampsia: false,
              otra_Condicion_Medica: false,
              anomalia_Congenita: false,
              Cardiopatia: false,
              infertibilidad: false,
              cirugia_genito_urinaria: false,
              nefropatia: false,
              violencia: false,
              enf_inmunologica: false,
              VIH_positivo: false,
              otros: "",
            },
          ]);
        } else {
          console.error("El documento no existe");
        }
      } catch (error) {
        console.log("Error al actualizar datos en Firebase", error);
      }
    } else {
      alert.alert("No se pudo encontrar un ID válido en localStorage");
    }
  };

  return (
    <div className="firstModuleScreenContainer">
      <div className="navContainer">
        <NavBarComponent
          onSignOut={handleLogout}
          showCloseExpedienteButton={false}
        />

        <div className="sectionInformation">
          <h2 className="title">
            Historia Clínica Perinatal - CLAP/SMR-OPS/OMS
          </h2>
          <div className="alertGroup">
            <span className="alert"></span>
            <h2 className="alertTitle">Amarillo es ALERTA</h2>
          </div>
        </div>
        <form className="formFourthModule" onSubmit={handleSubmit}>
          {DatosAfiliacion.map((item, index) => (
            <div key={index}>
              <div className="formularioFourthModule">
                <div className="formularioFourthChildren">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="inputNumberFourth"
                    value={DatosAfiliacion[index].Nombres}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Nombres", e.target.value)
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Apellido</label>
                  <input
                    type="text"
                    placeholder="Apellidos"
                    className="inputNumberFourth"
                    value={item.Apellidos}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Apellidos", e.target.value)
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Domicilio</label>
                  <input
                    type="text"
                    placeholder="Domicilio"
                    className="inputNumberFourth"
                    value={item.Domicilio}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Domicilio", e.target.value)
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Municipio</label>
                  <input
                    type="text"
                    placeholder="Municipio"
                    className="inputNumberFourth"
                    value={item.Municipio_de_Residencia}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Municipio_de_Residencia",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Telefono</label>
                  <input
                    type="tel"
                    placeholder="Telefono"
                    className="inputNumberFourth"
                    value={item.Telefono}
                    maxLength="8"
                    pattern="\d{1,8}"
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Telefono", e.target.value)
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Fecha Nacimiento</label>
                  <input
                    type="date"
                    placeholder="Fecha Nac"
                    className="inputNumberFourth"
                    value={item.Fecha_Nacimiento}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Fecha_Nacimiento",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Edad</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="Edad"
                    className="inputNumberFourth"
                    value={item.Edad}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Edad", e.target.value)
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label> Etnia:</label>
                  <select
                    className="inputNumberFourth"
                    value={item.Ednia}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Ednia", e.target.value)
                    }
                  >
                    <option>Opciones</option>
                    <option value="blanca">Blanca</option>
                    <option value="indigena">Indígena</option>
                    <option value="mestiza">Mestiza</option>
                    <option value="negra">Negra</option>
                    <option value="otra">Otra</option>
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label> Estudios:</label>
                  <select
                    className="inputNumberFourth"
                    value={item.Estudios}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Estudios", e.target.value)
                    }
                  >
                    <option>Opciones</option>
                    <option value="ninguno">Ninguno</option>
                    <option value="primaria">Primaria</option>
                    <option value="secundaria">Secundaria</option>
                    <option value="universidad">Universidad</option>
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label> Estado Civil:</label>
                  <select
                    className="inputNumberFourth"
                    value={item.Estado_Civil}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Estado_Civil",
                        e.target.value
                      )
                    }
                  >
                    <option>Opciones</option>
                    <option value="casada">Casada</option>
                    <option value="union estable">Unión Estable</option>
                    <option value="soltera">Soltera</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label> N° Expediente Unico:</label>
                  <input
                    type="text"
                    maxLength="16"
                    placeholder="Expediente Unico"
                    className="inputNumberFourth"
                    value={item.Numero_Expediente_Unico}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Numero_Expediente_Unico",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label> N° Identidad:</label>
                  <input
                    type="text"
                    maxLength="14"
                    placeholder="Identidad"
                    className="inputNumberFourth"
                    value={item.Numero_Identidad}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Numero_Identidad",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label> Codigo Lugar APN:</label>
                  <input
                    type="text"
                    placeholder="Codigo de Lugar de APN"
                    className="inputNumberFourth"
                    value={item.Codigo_lugar_Apn}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Codigo_lugar_Apn",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Nombres U/S APN:</label>
                  <input
                    type="text"
                    placeholder="Nombres U/S de APN"
                    className="inputNumberFourth"
                    value={item.Nombre_de_Apn}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Nombre_de_Apn",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label> Codigo Lugar Parto:</label>
                  <input
                    type="text"
                    maxLength="3"
                    placeholder="Codigo lugar del Parto"
                    className="inputNumberFourth"
                    value={item.Codigo_lugar_Parto}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Codigo_lugar_Parto",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Nombres U/S Parto:</label>
                  <input
                    type="text"
                    placeholder="Nombres U/S de Parto"
                    className="inputNumberFourth"
                    value={item.Nombre_US_Parto}
                    onChange={(e) =>
                      handleDatosAfiliacion(
                        index,
                        "Nombre_US_Parto",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Departamento: </label>
                  <select
                    className="inputNumberFourth"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                  >
                    <option value="">Selecciona un departamento</option>
                    {Object.keys(departmentsData).map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label>Municipio: </label>
                  <select
                    className="inputNumberFourth"
                    value={item.Municipio}
                    onChange={(e) =>
                      handleDatosAfiliacion(index, "Municipio", e.target.value)
                    }
                    disabled={!selectedDepartment}
                  >
                    <option value="">Selecciona un municipio</option>
                    {municipalities.map((muni) => (
                      <option key={muni} value={muni}>
                        {muni}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

           {/* ANTECEDENTES FAMILIARES */}
           <div className="formularioFourthModule">
            <h2>Antecedentes</h2>
          </div>
          {AntecedentesFamiliares.map((item, index) => (
            <div key={index}>
              <div className="formularioFourthModule">
                <div className="formularioFourthChildren">Familiares</div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`TBC${index}`}>TBC</label>
                  <Switch
                    id={`TBC${index}`}
                    checked={item.TBC === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(index, "TBC", newValue)
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Resultado</label>
                  <select
                    className="inputNumberFourth"
                    value={item.diabetes}
                    onChange={(e) =>
                      handleAntecedentesFamiliares(
                        index,
                        "diabetes",
                        e.target.value
                      )
                    }
                  >
                    <option>Opciones</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="G">G</option>
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`hipertension${index}`}>Hipertension</label>
                  <Switch
                    id={`hipertension${index}`}
                    checked={item.hipertension === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(
                        index,
                        "hipertension",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`preeclampsia${index}`}>Preeclampsia</label>
                  <Switch
                    id={`preeclampsia${index}`}
                    checked={item.preeclampsia === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(
                        index,
                        "preeclampsia",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`eclampsia${index}`}>Eclampsia</label>
                  <Switch
                    id={`eclampsia${index}`}
                    checked={item.eclampsia === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(index, "eclampsia", newValue)
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`otra_Condicion_Medica${index}`}>
                    Otra Condicion Medica Grave
                  </label>
                  <Switch
                    id={`otra_Condicion_Medica${index}`}
                    checked={item.otra_Condicion_Medica === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(
                        index,
                        "otra_Condicion_Medica",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`anomalia_Congenita${index}`}>
                    Anomalia Congenita
                  </label>
                  <Switch
                    id={`anomalia_Congenita${index}`}
                    checked={item.anomalia_Congenita === true}
                    onChange={(newValue) =>
                      handleAntecedentesFamiliares(
                        index,
                        "anomalia_Congenita",
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

          {/* ANTECEDENTES PERSONALES */}
          {AntecedentesPersonales.map((item, index) => (
            <div key={index}>
              <div className="formularioFourthModule">
                <div className="formularioFourthChildren">Personales</div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`TBC${index}`}>TBC</label>
                  <Switch
                    id={`TBC${index}`}
                    checked={item.TBC === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(index, "TBC", newValue)
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label>Resultado</label>
                  <select
                    className="inputNumberFourth"
                    value={item.diabetes}
                    onChange={(e) =>
                      handleAntecedentesPersonales(
                        index,
                        "diabetes",
                        e.target.value
                      )
                    }
                  >
                    <option>Opciones</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="G">G</option>
                  </select>
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`hipertension${index}`}>Hipertension</label>
                  <Switch
                    id={`hipertension${index}`}
                    checked={item.hipertension === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "hipertension",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`preeclampsia${index}`}>Preeclampsia</label>
                  <Switch
                    id={`preeclampsia${index}`}
                    checked={item.preeclampsia === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "preeclampsia",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`eclampsia${index}`}>Eclampsia</label>
                  <Switch
                    id={`eclampsia${index}`}
                    checked={item.eclampsia === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(index, "eclampsia", newValue)
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`otra_Condicion_Medica${index}`}>
                    Otra Condicion Medica Grave
                  </label>
                  <Switch
                    id={`otra_Condicion_Medica${index}`}
                    checked={item.otra_Condicion_Medica === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "otra_Condicion_Medica",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`anomalia_Congenita${index}`}>
                    Anomalia Congenita
                  </label>
                  <Switch
                    id={`anomalia_Congenita${index}`}
                    checked={item.anomalia_Congenita === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "anomalia_Congenita",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`Cardiopatia${index}`}>Cardiopatia</label>
                  <Switch
                    id={`Cardiopatia${index}`}
                    checked={item.Cardiopatia === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "Cardiopatia",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`infertibilidad${index}`}>
                    Infertibilidad
                  </label>
                  <Switch
                    id={`infertibilidad${index}`}
                    checked={item.infertibilidad === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "infertibilidad",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`cirugia_genito_urinaria${index}`}>
                    Cirugia genito urinaria
                  </label>
                  <Switch
                    id={`cirugia_genito_urinaria${index}`}
                    checked={item.cirugia_genito_urinaria === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "cirugia_genito_urinaria",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`nefropatia${index}`}>Nefropatia</label>
                  <Switch
                    id={`nefropatia${index}`}
                    checked={item.nefropatia === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "nefropatia",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`violencia${index}`}>Violencia</label>
                  <Switch
                    id={`violencia${index}`}
                    checked={item.violencia === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(index, "violencia", newValue)
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`enf_inmunologica${index}`}>
                    Enf Inmunologica
                  </label>
                  <Switch
                    id={`enf_inmunologica${index}`}
                    checked={item.enf_inmunologica === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "enf_inmunologica",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>
                <div className="formularioFourthChildren">
                  <label htmlFor={`VIH_positivo${index}`}>VIH Positivo</label>
                  <Switch
                    id={`VIH_positivo${index}`}
                    checked={item.VIH_positivo === true}
                    onChange={(newValue) =>
                      handleAntecedentesPersonales(
                        index,
                        "VIH_positivo",
                        newValue
                      )
                    }
                    onColor="#eff303" // Color cuando está en posición "Sí"
                    offColor="#888888" // Color cuando está en posición "No"
                  />
                </div>

                <div className="formularioFourthChildren">
                  <label>Otros</label>
                  <input
                    className="inputNumberFourth"
                    type="text"
                    value={item.otros}
                    onChange={(e) =>
                      handleAntecedentesPersonales(
                        index,
                        "otros",
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
      <ErrorModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        errorMessage={errorMessage}
        title="Error en el formulario"
      />
    </div>
  );
};

FirstModuleScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default FirstModuleScreen;
