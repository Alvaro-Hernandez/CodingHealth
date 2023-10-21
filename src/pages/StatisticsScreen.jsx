import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { db } from '../services/FirebaseServices';
import Chart from 'chart.js/auto';
import { useLocation } from "wouter";
import NavBarComponent from "../components/NavbarComponent";
import '../styles/statisticsStyle.css';

const StatisticsComponent = ({ onSignOut }) => {
  const [, setLocation] = useLocation();
  const [selectedId, setSelectedId] = useState('todos');
  const [enfermedades, setEnfermedades] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [globalPartoAborto, setGlobalPartoAborto] = useState({ parto: 0, aborto: 0 });

  const etiquetas = [
    'HTAPrevia', 'HTAInducidaEmbarazo', 'PreeDampsia', 'Eclampsia', 'CardioPatia',
    'Nefropatia', 'Diabetes', 'InfecOvular', 'InfeUrinaria', 'AmenazaPartoPreter',
    'RCIU', 'RoturaPremDeMembranas', 'Anemia', 'OtraCondicionGrave'
  ];

  const colores = [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
  ];

  useEffect(() => {
    const fetchAvailableIds = async () => {
      try {
        const dataFromFirebase = await db.collection('cartilla').get();
        const ids = dataFromFirebase.docs.map(doc => doc.id);
        setAvailableIds(ids);
      } catch (error) {
        console.error('Error al obtener IDs de Firebase:', error);
      }
    };

    fetchAvailableIds();
  }, []);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      let selectedIds = [];

      if (selectedId === 'todos') {
        selectedIds = availableIds;
      } else if (selectedId) {
        selectedIds = [selectedId];
      }

      const enfermedadesCount = new Array(etiquetas.length).fill(0);

      for (const id of selectedIds) {
        try {
          const data = (await db.collection('cartilla').doc(id).get()).data();

          if (data && data.ModuloPartoAborto && data.ModuloPartoAborto.EnfermedadesData) {
            const enfermedadesData = data.ModuloPartoAborto.EnfermedadesData[0];

            for (let i = 0; i < etiquetas.length; i++) {
              if (enfermedadesData[etiquetas[i]] === true) {
                enfermedadesCount[i]++;
              }
            }
          }
        } catch (error) {
          console.error('Error al obtener datos de Firebase:', error);
        }
      }

      setEnfermedades(enfermedadesCount);
    };

    fetchDataFromFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, availableIds]);

  useEffect(() => {
    if (enfermedades.length > 0) {
      const ctxBar = document.getElementById('myBarChart').getContext('2d');

      const existingChart = Chart.getChart(ctxBar);

      if (existingChart) {
        existingChart.destroy();
      }

      const dataValues = enfermedades;

      const barColors = colores.slice(0, etiquetas.length);

      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: etiquetas,
          datasets: [
            {
              label: 'Respuesta',
              data: dataValues,
              backgroundColor: barColors,
              borderColor: barColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enfermedades]);

  useEffect(() => {
    const fetchGlobalPartoAborto = async () => {
      let partoCount = 0;
      let abortoCount = 0;

      for (const id of availableIds) {
        try {
          const data = (await db.collection('cartilla').doc(id).get()).data();

          if (data && data.ModuloPartoAborto && data.ModuloPartoAborto.parto) {
            if (data.ModuloPartoAborto.parto === "Parto") partoCount++;
            if (data.ModuloPartoAborto.parto === "Aborto") abortoCount++;
          }
        } catch (error) {
          console.error('Error al obtener datos de parto y aborto:', error);
        }
      }

      setGlobalPartoAborto({ parto: partoCount, aborto: abortoCount });
    };

    fetchGlobalPartoAborto();
  }, [availableIds]);

  useEffect(() => {
    const ctxPie = document.getElementById('myPieChart').getContext('2d');

    const existingPieChart = Chart.getChart(ctxPie);
    if (existingPieChart) {
      existingPieChart.destroy();
    }

    new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: ['Parto', 'Aborto'],
        datasets: [{
          data: [globalPartoAborto.parto, globalPartoAborto.aborto],
          backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        }]
      }
    });
  }, [globalPartoAborto]);

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };

  const handleLogout = () => {
    onSignOut();
    setLocation("/login");
  };

  return (
    <div className="statisticsScreenContainer">
      <div className="navContainer">
        <NavBarComponent onSignOut={handleLogout} showCloseExpedienteButton={false} />

      </div>
      <div className="formControlStadistic">
        <section className="sectionContainerId">
          <h2>Dashboard de Indicadores</h2>
          <select
            onChange={handleSelectChange}
            value={selectedId}
          >
            <option value="">Selecciona un COD_EXPEDIENTE:</option>
            <option value="todos">Todos Los Pacientes</option>
            {availableIds.map(id => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <div className="chartContainer">
            <div>
              <label className="label">Basado en las enfermedades</label>
              <canvas id="myBarChart" className='graficEnfermedades'></canvas>
            </div>
            <div>
              <label className="label">Parto vs Aborto</label>
              <canvas id="myPieChart" className='graficAborto'></canvas>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

StatisticsComponent.propTypes = {
  onSignOut: PropTypes.func.isRequired,
}

export default StatisticsComponent;
