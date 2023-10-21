import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Chart from 'chart.js/auto';
import { db } from '../services/FirebaseServices';
import NavBarComponent from "../components/NavbarComponent";
import "../styles/statisticsStyle.css";

const StatisticsScreen = ({ onSignOut }) => {

  const [totalIds, setTotalIds] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const [availableIds, setAvailableIds] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);

  const etiquetas = [
    'HTAPrevia', 'HTAInducidaEmbarazo', 'PreeDampsia', 'Eclampsia', 'CardioPatia',
    'Nefropatia', 'Diabetes', 'InfecOvular', 'InfeUrinaria', 'AmenazaPartoPreter', 'RCIU',
    'RoturaPremDeMembranas', 'Anemia', 'OtraCondicionGrave'
  ];

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      if (selectedId && selectedId === 'todos') {
        try {
          const newData = (await db.collection('cartilla').doc(selectedId).get()).data()?.ModuloPartoAborto;

          if (newData) {

            console.log(newData.EnfermedadesData[0]);
            console.log(newData.EnfermedadesData[0].AmenazaPartoPreter);
            console.log(newData.EnfermedadesData[0].HTAPrevia);

            let newData15 = newData.EnfermedadesData[0].HTAInducidaEmbarazo === "false";
            let HTAInducidaEmbarazo = newData15 += 1;

            let newData14 = newData.EnfermedadesData[0].PreeDampsia === "false";
            let PreeDampsia = newData14 += 1;


            let newData13 = newData.EnfermedadesData[0].Eclampsia === "false";
            let Eclampsia = newData13 += 1;

            let newData12 = newData.EnfermedadesData[0].RCIU === "false";
            let RCIU = newData12 += 1;

            let newData10 = newData.EnfermedadesData[0].RoturaPremDeMembranas === "false";
            let RoturaPremDeMembranas = newData10 += 1;

            let newData9 = newData.EnfermedadesData[0].Anemia === "false";
            let Anemia = newData9 += 1;

            let newData8 = newData.EnfermedadesData[0].OtraCondicionGrave === "false";
            let OtraCondicionGrave = newData8 += 1;

            let newData7 = newData.EnfermedadesData[0].CardioPatia === "false";
            let CardioPatia = newData7 += 1;

            let newData6 = newData.EnfermedadesData[0].Nefropatia === "false";
            let Nefropatia = newData6 += 1;

            let newData5 = newData.EnfermedadesData[0].Diabetes === "true";
            let Diabetes = newData5 += 1;

            let newData1 = newData.EnfermedadesData[0].HTAPrevia === "true";
            let HTAPrevia = newData1 += 1;

            let newData2 = newData.EnfermedadesData[0].AmenazaPartoPreter === "true";
            let AmenazaPartoPreter = newData2 += 1;

            let newData3 = newData.EnfermedadesData[0].InfeUrinaria === "true";
            let InfeUrinaria = newData3 += 1;

            let newData4 = newData.EnfermedadesData[0].InfecOvular === "true";
            let InfecOvular = newData4 += 1;

            setEnfermedades([HTAPrevia, HTAInducidaEmbarazo, PreeDampsia,
              Eclampsia, CardioPatia, Nefropatia, Diabetes, InfecOvular, InfeUrinaria,
              AmenazaPartoPreter, RCIU, RoturaPremDeMembranas, Anemia, OtraCondicionGrave])
          }
        } catch (error) {
          console.error('Error al obtener datos de Firebase:', error);
        }
      }
    };

    fetchDataFromFirebase();
  }, [selectedId, availableIds]);

  useEffect(() => {
    const fetchAvailableIds = async () => {
      try {
        const dataFromFirebase = await db.collection('cartilla').get();
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
    if (enfermedades.length > 0) {
      const ctxBar = document.getElementById('myPieChart').getContext('2d');

      const existingChart = Chart.getChart(ctxBar);

      if (existingChart) {
        existingChart.destroy();
      }
      console.log(enfermedades);
      const dataValues = enfermedades;
      const pieColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ];

      const pieChart = new Chart(ctxBar, {
        type: 'bar',
        data: {

          labels: etiquetas,

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enfermedades]);



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

              <p style={{ color: 'black' }}>
                Total de Mujeres que se analizan en las Estadísticas: {totalIds}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space between' }}>
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
  );
};

StatisticsScreen.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default StatisticsScreen;
