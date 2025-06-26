document.addEventListener('DOMContentLoaded', function() {
  const updateCarbonMeter = async () => {
    try {
      // Cargar archivo CSV
      const response = await fetch('/datos/datos-clientes.csv');
      const csvData = await response.text();
      
      // Procesar CSV
      const lineas = csvData.split('\n');
      let totalCO2 = 0;
      let conteoClientes = 0;
      
      for (let i = 1; i < lineas.length; i++) {
        if (lineas[i].trim() === '') continue;
        
        const columnas = lineas[i].split(',');
        if (columnas.length >= 2) {
          const tonCO2 = parseFloat(columnas[1]);
          if (!isNaN(tonCO2)) {
            totalCO2 += tonCO2;
            conteoClientes++;
          }
        }
      }
      
      // Calcular promedio
      const promedio = conteoClientes > 0 ? (totalCO2 / conteoClientes).toFixed(1) : 0;
      
      // Actualizar HTML
      document.getElementById('clientes-count').textContent = conteoClientes;
      document.getElementById('promedio-co2').textContent = promedio;
      document.getElementById('total-co2').textContent = totalCO2.toFixed(1);
      
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };
  
  // Actualizar cada 5 minutos (300000 ms)
  updateCarbonMeter();
  setInterval(updateCarbonMeter, 300000);
});
