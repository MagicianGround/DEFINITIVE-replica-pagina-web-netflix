import React, { useState, useEffect } from 'react';

const MyForm = () => {
  const [loading, setLoading] = useState(true);

  // Simula la carga de datos
  useEffect(() => {
    // Simula un retraso de 2 segundos antes de actualizar el estado
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  return (
    <div>
      {loading ? (
        <img src="loading.gif" alt="" />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MyForm;
