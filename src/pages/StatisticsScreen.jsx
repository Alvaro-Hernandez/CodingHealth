import PropTypes from "prop-types";
import NavBarComponent from "../components/NavbarComponent";
import "../styles/statisticsStyle.css";
import React, { useEffect, useState } from 'react';
import { db } from '../services/FirebaseServices';
import Chart from 'chart.js/auto';



const StatisticsScreen = ({ onSignOut }) => {
    const [posicionPartoData, setPosicionPartoData] = useState([]);
  const [episiotomiaData, setEpisiotomiaData] = useState([]);
  const [totalIds, setTotalIds] = useState(0);
  const [selectedId, setSelectedId] = useState(''); // Estado para el ID seleccionado por el cliente
  const [availableIds, setAvailableIds] = useState([]); // Estado para almacenar los IDs disponibles
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      if (selectedId && selectedId !== 'todos') {
        try {
          const dataFromFirebase = await db.collection('Prueba Id Unico').doc(selectedId).get();
          const newData = dataFromFirebase.data();

          if (newData) {
            // Procesar los datos específicos para el ID seleccionado y actualizar las estadísticas
            let solicitadaUsuaria = 0;
            let sentada = 0;
            let acostada = 0;
            let cuclillas = 0;

            if (newData.Posicion_Parto[0].Solicitada_Por_Usuaria === "Si") {
              solicitadaUsuaria += 1;
            }
            if (newData.Posicion_Parto[0].Sentada === "Si") {
              sentada += 1;
            }
            if (newData.Posicion_Parto[0].Acostada === "Si") {
              acostada += 1;
            }
            if (newData.Posicion_Parto[0].Cunclillas === "Si") {
              cuclillas += 1;
            }

            setPosicionPartoData([solicitadaUsuaria, sentada, acostada, cuclillas]);

            let episiotomía = 0;
            let episiotomíaNo = 0;

            if (newData.Epiciotomia[0].Epiciotomia === "Si") {
              episiotomía += 1;
            }
            if (newData.Epiciotomia[0].Epiciotomia === "No") {
              episiotomíaNo += 1;
            }

            setEpisiotomiaData([episiotomía, episiotomíaNo]);
          }
        } catch (error) {
          console.error('Error al obtener datos de Firebase:', error);
        }
      } else if (selectedId === 'todos') {
        // Implementa la lógica para mostrar estadísticas generales cuando se seleccionan todos los IDs
        try {
          // Aquí puedes obtener y procesar datos generales de todos los IDs disponibles
          // Por ejemplo, puedes iterar sobre availableIds y calcular estadísticas globales
          // Luego, actualiza los estados posicionPartoData y episiotomiaData con las estadísticas generales
          let solicitadaUsuariaTotal = 0;
          let sentadaTotal = 0;
          let acostadaTotal = 0;
          let cuclillasTotal = 0;
          let episiotomíaTotal = 0;
          let episiotomíaNoTotal = 0;

          for (const id of availableIds) {
            const dataFromFirebase = await db.collection('Prueba Id Unico').doc(id).get();
            const newData = dataFromFirebase.data();

            if (newData) {
              // Procesar los datos generales para cada ID
              // Agregar los valores a las variables totales
              if (newData.Posicion_Parto[0].Solicitada_Por_Usuaria === "Si") {
                solicitadaUsuariaTotal += 1;
              }
              if (newData.Posicion_Parto[0].Sentada === "Si") {
                sentadaTotal += 1;
              }
              if (newData.Posicion_Parto[0].Acostada === "Si") {
                acostadaTotal += 1;
              }
              if (newData.Posicion_Parto[0].Cunclillas === "Si") {
                cuclillasTotal += 1;
              }
              if (newData.Epiciotomia[0].Epiciotomia === "Si") {
                episiotomíaTotal += 1;
              }
              if (newData.Epiciotomia[0].Epiciotomia === "No") {
                episiotomíaNoTotal += 1;
              }
            }
          }

          // Actualizar los estados con las estadísticas generales
          setPosicionPartoData([solicitadaUsuariaTotal, sentadaTotal, acostadaTotal, cuclillasTotal]);
          setEpisiotomiaData([episiotomíaTotal, episiotomíaNoTotal]);
        } catch (error) {
          console.error('Error al obtener datos generales de Firebase:', error);
        }
      }
    };

    fetchDataFromFirebase();
  }, [selectedId, availableIds]);

  
  useEffect(() => {
    const fetchAvailableIds = async () => {
      try {
        const dataFromFirebase = await db.collection('Prueba Id Unico').get();
        const ids = dataFromFirebase.docs.map(doc => doc.id);
        setAvailableIds(ids);
        setTotalIds(ids.length);
      } catch (error) {
        console.error('Error al obtener IDs de Firebase:', error);
      }
    };

    fetchAvailableIds();
  }, []);

  useEffect(() => {
    if (posicionPartoData.length > 0) {
      const ctxPie = document.getElementById('myPieChart').getContext('2d');
      
      // Obtener el gráfico existente, si lo hay
      const existingChart = Chart.getChart(ctxPie);

      // Destruir el gráfico existente antes de crear uno nuevo
      if (existingChart) {
        existingChart.destroy();
      }

      const dataValues = posicionPartoData;
      const pieColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ];

      const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: ['Solicitada Por Usuaria', 'Sentada', 'Acostada', 'Cunclillas'],
          datasets: [
            {
              label: 'Repuesta',
              data: dataValues,
              backgroundColor: pieColors,
              borderColor: pieColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
          },
        },
      });
    }
  }, [posicionPartoData]);

  useEffect(() => {
    if (episiotomiaData.length > 0) {
      const ctxPie2 = document.getElementById('myPieChart2').getContext('2d');
      
      // Obtener el gráfico existente, si lo hay
      const existingChart2 = Chart.getChart(ctxPie2);

      // Destruir el gráfico existente antes de crear uno nuevo
      if (existingChart2) {
        existingChart2.destroy();
      }

      const dataValues2 = episiotomiaData;
      const pieColors2 = [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 99, 132, 0.5)', // Nuevo color agregado
      ];

      const pieChart2 = new Chart(ctxPie2, {
        type: 'bar',
        data: {
          labels: ['Sí', 'No'],
          datasets: [
            {
              label: 'Episiotomía',
              data: dataValues2,
              backgroundColor: pieColors2,
              borderColor: pieColors2,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
          },
        },
      });
    }
  }, [episiotomiaData]);

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };


    return (
        <div className="statisticsScreenContainer">
            <div className="navContainer">
                <NavBarComponent onSignOut={onSignOut} />
                <div className="formControl">
                <section className="sectionContainerId">
                <div>
                    <div>
                        <label htmlFor="idInput">Ingresa un ID:</label>
                        <input
                            type="text"
                            id="idInput"
                            value={selectedId}
                            onChange={handleSelectChange}
                            placeholder="ID..."
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <span style={{ margin: '0 10px' }}>o</span>
                    <select
                        onChange={handleSelectChange}
                        value={selectedId}
                        style={{
                            padding: '5px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Selecciona un ID</option>
                        <option value="todos">Seleccionar Todos</option>
                        {availableIds.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>

                    <p style={{ color: 'black' }}>Total de Mujeres que se analizan en las Estadísticas: {totalIds}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <canvas id="myPieChart"></canvas>
                        </div>
                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <canvas id="myPieChart2"></canvas>
                        </div>
                    </div>
                </div>
            
            </section>
            </div>
            </div>
        </div>
    )
}

StatisticsScreen.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default StatisticsScreen;