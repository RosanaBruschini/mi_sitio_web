import React, { useEffect, useState } from 'react';

const CarbonFootprint = () => {
  const [footprintData, setFootprintData] = useState({
    clientes: 0,
    promedioCO2: 0,
    totalCO2: 0
  });

  useEffect(() => {
    const procesarCSV = (texto) => {
      const lineas = texto.split('\n');
      let totalCO2 = 0;
      let conteoClientes = 0;

      for (let i = 1; i < lineas.length; i++) {
        const columnas = lineas[i].split(',');
        if (columnas.length >= 2) {
          const tonCO2 = parseFloat(columnas[1]);
          if (!isNaN(tonCO2)) {
            totalCO2 += tonCO2;
            conteoClientes++;
          }
        }
      }

      const promedio = conteoClientes > 0 ? (totalCO2 / conteoClientes) : 0;
      
      setFootprintData({
        clientes: conteoClientes,
        promedioCO2: promedio.toFixed(1),
        totalCO2: totalCO2.toFixed(1)
      });
    };

    fetch('/datos/datos-clientes.csv')
      .then(response => response.text())
      .then(procesarCSV)
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section className="carbon-meter">
      <div className="container">
        <h2>Medición en Tiempo Real</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>{footprintData.clientes}</h3>
            <p>Clientes</p>
          </div>
          <div className="stat-card">
            <h3>{footprintData.promedioCO2} ton</h3>
            <p>Promedio por cliente</p>
          </div>
          <div className="stat-card">
            <h3>{footprintData.totalCO2} ton</h3>
            <p>Total reducido</p>
          </div>
        </div>
        <p className="note">Actualizado desde tu archivo CSV</p>
      </div>
    </section>
  );
};

export default CarbonFootprint;
