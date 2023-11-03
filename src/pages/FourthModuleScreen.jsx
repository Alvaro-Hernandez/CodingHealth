import PropTypes from "prop-types";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import NavBarComponent from "../components/NavbarComponent";
import { db } from "../services/FirebaseServices";
import "../styles/fourtModuleStyle.css";
import Switch from "react-switch";

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
      estimulacion: false,
      aspiracion: false,
      mascara: false,
      oxigeno: false,
      masaje: false,
      tubo: false,
      otros: false,
      fallece_lugar_De_Parto: false,
      madre : false,
      RN: false,
    },
  ]);

  const [Atendio, setAtendio] = useState([
    {
      parto: "Parto",
      medico: false,
      obstretico: false,
      pediatria: false,
      enfermero: false,
      auxiliar: false,
      estudiante: false,
      empir: false,
      otro: false,
      nombre: "",
    },
    {
      neonato: "Neonato",
      medico: false,
      obstretico: false,
      pediatria: false,
      enfermero: false,
      auxiliar: false,
      estudiante: false,
      empir: false,
      otro: false,
      nombre: "",
    },
  ]);

  const [CuidadosEsenciales, setCuidadosEsenciales] = useState([
    {
      apego_Precoz: "Apego precoz",
      no: false,
      si: false,
      nc: false
    },
    {
      lactancia_materna_1_Hora: "Lactancia materna",
      no: false,
      si: false,
      nc: false
    },
    {
        cura_Umbilical: "Cura Umbilical",
        no: false,
        si: false,
        nc: false
    },

     {
        profilaxis_Oftalmica: "Profilaxis Oftalmica",
        no: false,
        si: false,
        nc: false
    },

    {
        Vitamina_K: "Vitamina K",
        no: false,
        si: false,
        nc: false
    },
  ]);

  const [Referido, setReferido] = useState([
    {
      aloj_Conjun: false,
      neonatologo: false,
      otros_hosp: false,
      anomalias_Congenitas: "",
    },
   
  ]);
  const [PatologiaRM, setPatologiaRM] = useState([
    {
      ninguna: false,
      una_O_Mas: false,
      CIE_10_Uno: "",
      CIE_10_Dos: "",
      CIE_10_Tres: "",
    },
   
  ]);

  const [VIH_En_RN, setVIH_En_RN] = useState([
    {
      expuesto: "Expuesto",
      no: false,
      si: false,
      sd: false,
    },

    {
      tto: "Tto",
      no: false,
      si: false,
      sd: false,
    },
   
  ]);


const [TamizajeNeonatal, setTamizajeNeonatal] = useState([
    {
      Sifilis: "Sifilis",
      negativo: false,
      positivo: false,
      no_Se_Hizo: false
    },
    {
        Audic: "Audic",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },
    {
        Chagas: "Chagas",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },
    {
        Bilirrub: "Bilirrub",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },
     {
        Toxo_IgM: "Toxo IgM",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },
    {
        Hb_patia: "Hb patia",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },
    {
        Cardiov: "Cardiov",
        negativo: false,
        positivo: false,
        no_Se_Hizo: false
    },

  ]);

  const [Egreso_RN, setEgreso_RN] = useState([
    {
      vivo: false,
      fallece: false,
      fecha: "",
      hora: "",
      minutos: "",
      fallece_Lugar_Traslado: "",
      edad_Al_Egreso: "",
      menor_Un_Dia: false,
      lugar_De_Traslado: "",
      alimento_Al_Alta: "",
      bocarriba: false,
      BCG: false,
      inmuno_Hepatitis_B: "",
      meconio_Uno_Dia: false,
      peso_Al_Egreso: "",

    },

  ]);

  const [setCurrentIndex] = useState(0);
  const [PuerperioInmediato, setPuerperioInmediato] = useState([
    {
      hora: "",
      minuto: "",
      temperatura_C: "",
      PA: "",
      FC: "",
      involucion_Uterina: "",
      loquios: "",
      responsable_De_La_Salud: "",
      iglobulina_Anti_D: "",
    },
  ]);
  
  const addNewPuerperioInmediato = () => {
    if (PuerperioInmediato.length < 8) {
      const addNewPuerperioInmediato = {
        hora: "",
        minuto: "",
        temperatura_C: "",
        PA: "",
        FC: "",
        involucion_Uterina: "",
        loquios: "",
        responsable_De_La_Salud: "",
        iglobulina_Anti_D: "",
      };

      setPuerperioInmediato([...PuerperioInmediato, addNewPuerperioInmediato]);

      // Actualiza el índice para mostrar la nueva atención agregada
      setCurrentIndex(PuerperioInmediato.length);
    }
  };
  const [Fecha_de_seguimiento, setFecha_de_seguimiento] = useState([
    {
      fecha: "",
      lugar_de_seguimiento:"",
      idRN: "",
      nombre_RN: "",
    }
  ])
   


  // UseEffect para cargar los datos desde Firebase al montar el componente
  useEffect(() => {
    if (cachedId) {
      try {
        const docRef = db.collection("cartilla").doc(cachedId);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data.ModuloPuerperio) {
              const {
                 RecienNacido, 
                 Reanimacion, 
                 Atendio,
                 CuidadosEsenciales,
                 Referido,
                 PatologiaRM,
                 VIH_En_RN,
                 TamizajeNeonatal,
                 Egreso_RN, 
                 PuerperioInmediato,
                 Fecha_de_seguimiento,
                } = data.ModuloPuerperio;
              // Establecer los datos recuperados en el estado
              setRecienNacido(RecienNacido);
              setReanimacion(Reanimacion);
              setAtendio(Atendio);
              setCuidadosEsenciales(CuidadosEsenciales);
              setReferido(Referido);
              setPatologiaRM(PatologiaRM);
              setVIH_En_RN(VIH_En_RN);
              setTamizajeNeonatal(TamizajeNeonatal);
              setEgreso_RN(Egreso_RN);
              setPuerperioInmediato(PuerperioInmediato);
              setFecha_de_seguimiento(Fecha_de_seguimiento);
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
    updatedRecienNacido[index][field] = newValue;
    setRecienNacido(updatedRecienNacido);
  };

  // Manejar cambios en los datos de reanimación
  const handleReanimacion = (index, field, newValue) => {
    const updatedReanimacion = [...Reanimacion];
    updatedReanimacion[index][field] = newValue ? true : false;
    setReanimacion(updatedReanimacion);
  };

  const handleAtendio = (index, field, newValue) => {
    const updatedAtendio = [...Atendio];
    updatedAtendio[index][field] = newValue;
    setAtendio(updatedAtendio);
  };

  const handleCuidadosEsenciales = (index, field, newValue) => {
    const updatedCuidadosEsenciales = [...CuidadosEsenciales];
    updatedCuidadosEsenciales[index][field] = newValue ? true : false;
    setCuidadosEsenciales(updatedCuidadosEsenciales);
  };

  const handleReferido = (index, field, newValue) => {
    const updatedReferido = [...Referido];
    updatedReferido[index][field] = newValue;
    setReferido(updatedReferido);
  };
  const handlePatologiaRM = (index, field, newValue) => {
    const updatedPatologiaRM = [...PatologiaRM];
    updatedPatologiaRM[index][field] = newValue;
    setPatologiaRM(updatedPatologiaRM);
  };

  const handleVIH_En_RN = (index, field, newValue) => {
    const updatedVIH_En_RN = [...VIH_En_RN];
    updatedVIH_En_RN[index][field] = newValue;
    setVIH_En_RN(updatedVIH_En_RN);
  };


  const handleTamizajeNeonatal = (index, field, newValue) => {
    const updatedTamizajeNeonatal = [...TamizajeNeonatal];
    updatedTamizajeNeonatal[index][field] = newValue ? true : false;
    setTamizajeNeonatal(updatedTamizajeNeonatal);
  };

  const handleEgreso_RN = (index, field, newValue) => {
    const updatedEgreso_RN = [...Egreso_RN];
    updatedEgreso_RN[index][field] = newValue;
    setEgreso_RN(updatedEgreso_RN);
  };
  const handlePuerperioInmediato = (index, field, value) => {
    const updatedPuerperioInmediato = [...PuerperioInmediato];
    updatedPuerperioInmediato[index][field] = value;
    setPuerperioInmediato(updatedPuerperioInmediato);
  };

  const handleFecha_de_seguimiento = (index, field, value) => {
    const updatedFecha_de_seguimiento = [...Fecha_de_seguimiento];
    updatedFecha_de_seguimiento[index][field] = value;
    setFecha_de_seguimiento(updatedFecha_de_seguimiento);
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
            Atendio: Atendio,
            CuidadosEsenciales: CuidadosEsenciales,
            Referido: Referido,
            TamizajeNeonatal: TamizajeNeonatal,
            PatologiaRM: PatologiaRM,
            VIH_En_RN: VIH_En_RN,
            Egreso_RN: Egreso_RN,
            PuerperioInmediato: PuerperioInmediato,
            Fecha_de_seguimiento: Fecha_de_seguimiento,
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
              propfilasis_ocular: false,
              apego_precoz: false,
            },
          ]);

            setReanimacion ([
            {
              estimulacion: false,
              aspiracion: false,
              mascara: false,
              oxigeno: false,
              masaje: false,
              tubo: false,
              otros: false,
              fallece_lugar_De_Parto: false,
              madre : false,
              RN: false,
            },
          ]);
          setAtendio([
            {
              parto: "Parto",
              medico: false,
              obstretico: false,
              pediatria: false,
              enfermero: false,
              auxiliar: false,
              estudiante: false,
              empir: false,
              otro: false,
              nombre: "",
            },
            {
              neonato: "Neonato",
              medico: false,
              obstretico: false,
              pediatria: false,
              enfermero: false,
              auxiliar: false,
              estudiante: false,
              empir: false,
              otro: false,
              nombre: "",
            },
          ]);

          setCuidadosEsenciales([
            {
              apego_Precoz: "Apego precoz",
              no: false,
              si: false,
              nc: false
            },
            {
              lactancia_materna_1_Hora: "Lactancia materna",
              no: false,
              si: false,
              nc: false
            },
            {
                cura_Umbilical: "Cura Umbilical",
                no: false,
                si: false,
                nc: false
            },
        
             {
                profilaxis_Oftalmica: "Profilaxis Oftalmica",
                no: false,
                si: false,
                nc: false
            },
        
            {
                Vitamina_K: "Vitamina K",
                no: false,
                si: false,
                nc: false
            },
          ]);

          setReferido([
            {
              aloj_Conjun: false,
              neonatologo: false,
              otros_hosp: false,
              anomalias_Congenitas: "",
            },
           
          ]);

          setPatologiaRM([
            {
              ninguna: false,
              una_O_Mas: false,
              CIE_10_Uno: "",
              CIE_10_Dos: "",
              CIE_10_Tres: "",
            },
           
          ]);

          setVIH_En_RN([
            {
              expuesto: "Expuesto",
              no: false,
              si: false,
              sd: false,
            },
        
            {
              tto: "Tto",
              no: false,
              si: false,
              sd: false,
            },
           
          ]);


         setTamizajeNeonatal([
            {
              Sifilis: "Sifilis",
              negativo: false,
              positivo: false,
              no_Se_Hizo: false
            },
            {
                Audic: "Audic",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
            {
                Chagas: "Chagas",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
            {
                Bilirrub: "Bilirrub",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
             {
                Toxo_IgM: "Toxo IgM",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
            {
                Hb_patia: "Hb patia",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
            {
                Cardiov: "Cardiov",
                negativo: false,
                positivo: false,
                no_Se_Hizo: false
            },
        
          ]);

          setEgreso_RN([
            {
              vivo: false,
              fallece: false,
              fecha: "",
              hora: "",
              minutos: "",
              fallece_Lugar_Traslado: "",
              edad_Al_Egreso: "",
              menor_Un_Dia: false,
              lugar_De_Traslado: "",
              alimento_Al_Alta: "",
              bocarriba: false,
              BCG: false,
              inmuno_Hepatitis_B: "",
              meconio_Uno_Dia: false,
              peso_Al_Egreso: "",
        
            },
        
          ]);
         setPuerperioInmediato([
            {
              hora: "",
              minuto: "",
              temperatura_C: "",
              PA: "",
              FC: "",
              involucion_Uterina: "",
              loquios: "",
              responsable_De_La_Salud: "",
              iglobulina_Anti_D: "",
            },
          ]);
          setFecha_de_seguimiento([
            {
              fecha: "",
              lugar_de_seguimiento:"",
              idRN: "",
              nombre_RN: "",
            }
          ])
           
        
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
  };

  return (
    <div>
      <NavBarComponent
        onSignOut={handleLogout}
        showCloseExpedienteButton={false}
      />

      <form className="formFourthModule" >
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
                  checked={RecienNacido[index].vitamina_K === true}
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
                  checked={RecienNacido[index].propfilasis_ocular === true}
                  onChange={(newValue) =>
                    handleRecienNacido(index, "propfilasis_ocular", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label>Apego Precoz</label>
                <Switch
                  id={`apego_precoz${index}`}
                  checked={RecienNacido[index].apego_precoz === true}
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
                  checked={Reanimacion[index].estimulacion === true}
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
                  checked={Reanimacion[index].aspiracion === true}
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
                  checked={Reanimacion[index].mascara === true}
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
                  checked={Reanimacion[index].oxigeno === true}
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
                  checked={Reanimacion[index].masaje === true}
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
                  checked={Reanimacion[index].tubo === true}
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
                  checked={Reanimacion[index].otros === true}
                  onChange={(newValue) =>
                    handleReanimacion(index, "otros", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label>Fallece lugar de parto (Bebe):</label>
                <Switch
                  id={`fallece_lugar_De_Parto${index}`}
                  checked={Reanimacion[index].fallece_lugar_De_Parto === true}
                  onChange={(newValue) =>
                    handleReanimacion(index, "fallece_lugar_De_Parto", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>

              <div className="formularioFourthChildren">
                <label>Fallece (Madre)</label>
                <Switch
                  id={`madre${index}`}
                  checked={Reanimacion[index].madre === true}
                  onChange={(newValue) =>
                    handleReanimacion(index, "madre", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
              <div className="formularioFourthChildren">
                <label>RN</label>
                <Switch
                  id={`RN${index}`}
                  checked={Reanimacion[index].RN === true}
                  onChange={(newValue) =>
                    handleReanimacion(index, "RN", newValue)
                  }
                  onColor="#eff303" // Color cuando está en posición "Sí"
                  offColor="#888888" // Color cuando está en posición "No"
                />
              </div>
            </div>
          </div>
        ))}

         {/* ATENDIO */}
         <div className="formularioFourthChildren">
              <h2> Persona que atendio</h2>
            </div>
            {Atendio.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  <div className="formularioFourthChildren">
                    <label>
                      {item.parto || item.neonato}
                    </label>
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`medico${index}`}>Medico</label>
                    <Switch
                      id={`medico${index}`}
                      checked={item.medico === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "medico", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`obstretico${index}`}>Obstretico</label>
                    <Switch
                      id={`obstretico${index}`}
                      checked={item.obstretico === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "obstretico", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`pediatria${index}`}>Pediatria</label>
                    <Switch
                      id={`pediatria${index}`}
                      checked={item.pediatria === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "pediatria", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label htmlFor={`enfermero${index}`}>Enfermero</label>
                    <Switch
                      id={`enfermero${index}`}
                      checked={item.enfermero === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "enfermero", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`auxiliar${index}`}>Auxiliar</label>
                    <Switch
                      id={`auxiliar${index}`}
                      checked={item.auxiliar === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "auxiliar", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`estudiante${index}`}>Estudiante</label>
                    <Switch
                      id={`estudiante${index}`}
                      checked={item.estudiante === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "estudiante", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`empir${index}`}>Empir</label>
                    <Switch
                      id={`empir${index}`}
                      checked={item.empir === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "empir", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`otro${index}`}>Otro</label>
                    <Switch
                      id={`otro${index}`}
                      checked={item.otro === true}
                      onChange={(newValue) =>
                        handleAtendio(index, "otro", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`nombre${index}`}> Nombre</label>
                    <input
                      className="text"
                      type="text"
                      value={item.nombre}
                      onChange={(e) =>
                        handleAtendio(
                          index,
                          "nombre",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* CUIDAOS ENSENCIALES */}
         <div className="formularioFourthChildren">
              <h2> Cuidados Esenciales</h2>
            </div>
            {CuidadosEsenciales.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  <div className="formularioFourthChildren">
                    <label>
                      {item.apego_Precoz || item.lactancia_materna_1_Hora ||
                      item.cura_Umbilical || item.profilaxis_Oftalmica || item.Vitamina_K  }
                    </label>
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={item.no === true}
                      onChange={(newValue) =>
                        handleCuidadosEsenciales(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={item.si === true}
                      onChange={(newValue) =>
                        handleCuidadosEsenciales(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`nc${index}`}>N/C</label>
                    <Switch
                      id={`nc${index}`}
                      checked={item.nc === true}
                      onChange={(newValue) =>
                        handleCuidadosEsenciales(index, "nc", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                </div>
              </div>
            ))}


            {/* REFERIDO */}
            <div className="formularioFourthChildren">
              <h2>Referido</h2>
            </div>
            {Referido.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  
                  <div className="formularioFourthChildren">
                    <label htmlFor={`aloj_Conjun${index}`}>Aloj Conjun</label>
                    <Switch
                      id={`aloj_Conjun${index}`}
                      checked={item.aloj_Conjun === true}
                      onChange={(newValue) =>
                        handleReferido(index, "aloj_Conjun", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`neonatologo${index}`}>Neonatologo</label>
                    <Switch
                      id={`neonatologo${index}`}
                      checked={item.neonatologo === true}
                      onChange={(newValue) =>
                        handleReferido(index, "neonatologo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label htmlFor={`otros_hosp${index}`}>Otros Hosp</label>
                    <Switch
                      id={`otros_hosp${index}`}
                      checked={item.otros_hosp === true}
                      onChange={(newValue) =>
                        handleReferido(index, "otros_hosp", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  
                  
                  <div className="formularioFourthChildren">
                    <label>Anomalias Congenitas</label>
                    <select
                      className="inputNumberFourth"
                      value={item.anomalias_Congenitas}
                      onChange={(e) =>
                        handleReferido(index, "anomalias_Congenitas", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="No">No</option>
                      <option value="Si">Si</option>
                      <option value="Única">Única</option>
                      <option value="Múltiple">Múltiple</option>
                    </select>
                  </div> 
                </div>
              </div>
            ))}

             {/* PATOLOGIA RM */}
             <div className="formularioFourthChildren">
              <h2>Patologia RM</h2>
            </div>
            {PatologiaRM.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  
                  <div className="formularioFourthChildren">
                    <label htmlFor={`ninguna${index}`}>Ninguna</label>
                    <Switch
                      id={`ninguna${index}`}
                      checked={item.ninguna === true}
                      onChange={(newValue) =>
                        handlePatologiaRM(index, "ninguna", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`una_O_Mas${index}`}>1 Ó Mas</label>
                    <Switch
                      id={`una_O_Mas${index}`}
                      checked={item.una_O_Mas === true}
                      onChange={(newValue) =>
                        handlePatologiaRM(index, "una_O_Mas", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label>CIE_10</label>
                    <input
                      className="text"
                      type="number"
                      value={item.CIE_10_Uno}
                      onChange={(e) =>
                        handlePatologiaRM(
                          index,
                          "CIE_10_Uno",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label>CIE_10</label>
                    <input
                      className="text"
                      type="number"
                      value={item.CIE_10_Dos}
                      onChange={(e) =>
                        handlePatologiaRM(
                          index,
                          "CIE_10_Dos",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label>CIE_10</label>
                    <input
                      className="text"
                      type="number"
                      value={item.CIE_10_Tres}
                      onChange={(e) =>
                        handlePatologiaRM(
                          index,
                          "CIE_10_Tres",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* VIH_En_RN */}
         <div className="formularioFourthChildren">
              <h2>VIH En RN</h2>
            </div>
            {VIH_En_RN.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  <div className="formularioFourthChildren">
                    <label>
                      {item.expuesto || item.tto}
                    </label>
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`no${index}`}>No</label>
                    <Switch
                      id={`no${index}`}
                      checked={item.no === true}
                      onChange={(newValue) =>
                        handleVIH_En_RN(index, "no", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`si${index}`}>Si</label>
                    <Switch
                      id={`si${index}`}
                      checked={item.si === true}
                      onChange={(newValue) =>
                        handleVIH_En_RN(index, "si", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`sd${index}`}>S/D</label>
                    <Switch
                      id={`sd${index}`}
                      checked={item.sd === true}
                      onChange={(newValue) =>
                        handleVIH_En_RN(index, "sd", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                </div>
              </div>
            ))}

              {/* TAMIZAJES NEONATAL */}
         <div className="formularioFourthChildren">
              <h2> Tamizajes Neonatal</h2>
            </div>
            {TamizajeNeonatal.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                  <div className="formularioFourthChildren">
                    <label>
                      {item.Sifilis || item.Audic || 
                      item.Chagas || item.Bilirrub || 
                      item.Toxo_IgM || item.Hb_patia 
                      || item.Cardiov
                      }
                    </label>
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`negativo${index}`}>-</label>
                    <Switch
                      id={`negativo${index}`}
                      checked={item.negativo === true}
                      onChange={(newValue) =>
                        handleTamizajeNeonatal(index, "negativo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`positivo${index}`}>+</label>
                    <Switch
                      id={`positivo${index}`}
                      checked={item.positivo === true}
                      onChange={(newValue) =>
                        handleTamizajeNeonatal(index, "positivo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`no_Se_Hizo${index}`}>No se hizo</label>
                    <Switch
                      id={`no_Se_Hizo${index}`}
                      checked={item.no_Se_Hizo === true}
                      onChange={(newValue) =>
                        handleTamizajeNeonatal(index, "no_Se_Hizo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                </div>
              </div>
            ))}

             {/* Egreso_RN */}
         <div className="formularioFourthChildren">
              <h2> Egreso RN</h2>
            </div>
            {Egreso_RN.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                 
                  <div className="formularioFourthChildren">
                    <label htmlFor={`vivo${index}`}>Vivo</label>
                    <Switch
                      id={`vivo${index}`}
                      checked={item.vivo === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "vivo", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`fallece${index}`}>Fallece</label>
                    <Switch
                      id={`fallece${index}`}
                      checked={item.fallece === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "fallece", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label>Fecha</label>
                    <input
                      className="text"
                      type="date"
                      value={item.fecha}
                      onChange={(e) =>
                        handleEgreso_RN(index, "fecha", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label>Minutos</label>
                    <input
                      className="text"
                      type="number"
                      value={item.minutos}
                      onChange={(e) =>
                        handleEgreso_RN(index, "minutos", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label>fallece Lugar Traslado</label>
                    <select
                      className="inputNumberFourth"
                      value={item.fallece_Lugar_Traslado}
                      onChange={(e) =>
                        handleEgreso_RN(index, "fallece_Lugar_Traslado", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="No">No</option>
                      <option value="Si">Si</option>
                      <option value="S/D">S/D</option>
                    </select>
                  </div> 

                  <div className="formularioFourthChildren">
                  <label>Edad Al Egreso</label>
                    <input
                      className="text"
                      type="number"
                      value={item.edad_Al_Egreso}
                      onChange={(e) =>
                        handleEgreso_RN(index, "edad_Al_Egreso", e.target.value)
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label htmlFor={`menor_Un_Dia${index}`}>Menor Un Dia</label>
                    <Switch
                      id={`menor_Un_Dia${index}`}
                      checked={item.menor_Un_Dia === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "menor_Un_Dia", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label>Lugar De Traslado</label>
                    <input
                      className="text"
                      type="text"
                      value={item.lugar_De_Traslado}
                      onChange={(e) =>
                        handleEgreso_RN(index, "lugar_De_Traslado", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label>Alimento Al Alta</label>
                    <select
                      className="inputNumberFourth"
                      value={item.alimento_Al_Alta}
                      onChange={(e) =>
                        handleEgreso_RN(index, "alimento_Al_Alta", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="Lact_Excl">Lact_Excl</option>
                      <option value="Parcial">Parcial</option>
                      <option value="Artificial">Artificial</option>
                    </select>
                  </div> 

                  <div className="formularioFourthChildren">
                    <label htmlFor={`bocarriba${index}`}>Bocarriba</label>
                    <Switch
                      id={`bocarriba${index}`}
                      checked={item.bocarriba === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "bocarriba", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label htmlFor={`BCG${index}`}>BCG</label>
                    <Switch
                      id={`BCG${index}`}
                      checked={item.BCG === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "BCG", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>Inmuno Hepatitis B</label>
                    <select
                      className="inputNumberFourth"
                      value={item.inmuno_Hepatitis_B}
                      onChange={(e) =>
                        handleEgreso_RN(index, "inmuno_Hepatitis_B", e.target.value)
                      }
                    >
                      <option>Opciones</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                      <option value="N/C">N/C</option>
                    </select>
                  </div> 

                  <div className="formularioFourthChildren">
                    <label htmlFor={`meconio_Uno_Dia${index}`}>Meconio 1 Dia</label>
                    <Switch
                      id={`meconio_Uno_Dia${index}`}
                      checked={item.meconio_Uno_Dia === true}
                      onChange={(newValue) =>
                        handleEgreso_RN(index, "meconio_Uno_Dia", newValue)
                      }
                      onColor="#eff303" // Color cuando está en posición "Sí"
                      offColor="#888888" // Color cuando está en posición "No"
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label>Peso Al Egreso</label>
                    <input
                      className="text"
                      type="number"
                      value={item.peso_Al_Egreso}
                      onChange={(e) =>
                        handleEgreso_RN(index, "peso_Al_Egreso", e.target.value)
                      }
                    />
                  </div>

                </div>
              </div>
            ))}

              {/* Puerperio Inmediato */}
              <h2>Atenciones de puerperio inmediato</h2>
            {PuerperioInmediato.map((atencion, index) => (
              <div key={index}>
                <div className="formularioFourthModule">
                <div className="formularioFourthChildren">
                  Lista de atenciones de puerperio inmediato {index + 1}
                </div>
                  <div className="formularioFourthChildren">
                    <label>Hora</label>
                    <input
                      className="text"
                      type="number"
                      value={atencion.hora}
                      onChange={(e) =>
                        handlePuerperioInmediato(index, "hora", e.target.value)
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label>Minuto</label>
                    <input
                      className="text"
                      type="number"
                      value={atencion.minuto}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "minuto",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                    <label>Tempertura C</label>
                    <input
                      className="text"
                      type="number"
                      value={atencion.temperatura_C}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "temperatura_C",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>PA</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.PA}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "PA",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  
                  <div className="formularioFourthChildren">
                    <label>FC</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.FC}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "FC",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>Involucion Uterina</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.involucion_Uterina}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "involucion_Uterina",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>Loquios</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.loquios}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "loquios",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>Responsable De La Salud</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.responsable_De_La_Salud}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "responsable_De_La_Salud",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                    <label>Iglobulina Anti D</label>
                    <input
                      className="text"
                      type="text"
                      value={atencion.iglobulina_Anti_D}
                      onChange={(e) =>
                        handlePuerperioInmediato(
                          index,
                          "iglobulina_Anti_D",
                          e.target.value
                        )
                      }
                    />
                  </div>
            
                </div>

              </div>
            ))} 
             {/* FECHA DE SEGUIMIENTO */}
         <div className="formularioFourthChildren">
              <h2>Fecha de seguimiento de la cita</h2>
            </div>
            {Fecha_de_seguimiento.map((item, index) => (
              <div key={index}>
                <div className="formularioFourthModule">

                  <div className="formularioFourthChildren">
                  <label htmlFor={`fecha${index}`}>Fecha de seguimiento</label>
                    <input
                      className="text"
                      type="date"
                      value={item.fecha}
                      onChange={(e) =>
                        handleFecha_de_seguimiento(
                          index,
                          "fecha",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="formularioFourthChildren">
                  <label htmlFor={`lugar_de_seguimiento${index}`}>Lugar de seguimiento</label>
                    <input
                      className="text"
                      type="text"
                      value={item.lugar_de_seguimiento}
                      onChange={(e) =>
                        handleFecha_de_seguimiento(
                          index,
                          "lugar_de_seguimiento",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label htmlFor={`idRN${index}`}>IdRN</label>
                    <input
                      className="text"
                      type="number"
                      value={item.idRN}
                      onChange={(e) =>
                        handleFecha_de_seguimiento(
                          index,
                          "idRN",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="formularioFourthChildren">
                  <label htmlFor={`nombre_RN${index}`}>Nombre RN</label>
                    <input
                      className="text"
                      type="text"
                      value={item.nombre_RN}
                      onChange={(e) =>
                        handleFecha_de_seguimiento(
                          index,
                          "nombre_RN",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  
                </div>
              </div>
            ))}


        <div className="containerButtonFourth">
          <button className="ButtonEnviarFourth" type="button"onClick={handleSubmit}>
            Guardar
          </button>
          <button
            className="ButtonCancelFourth"
            type="button"
            onClick={handleButtonClick}
          >
            Cancelar
          </button>

          <button
            className="ButtonCancelFourth"
            type="button"
            onClick={recargarPagina}
          >
            Recargar
          </button>
        </div>
      </form>
      <div className="containerButtonFourth"></div>
      <button className="ButtonEnviarFourth" onClick={addNewPuerperioInmediato}>Agregar Nueva Atención</button>
    </div>
  );
};

const recargarPagina = () => {
  window.location.reload(); // Esto recargará la página actual
};

FourthModuleScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default FourthModuleScreen;
