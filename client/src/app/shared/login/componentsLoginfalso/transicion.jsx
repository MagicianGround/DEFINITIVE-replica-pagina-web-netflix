import React, { useState } from 'react';

const MyForm = () => {
  const [loading, setLoading] = useState(false);


  return (
    <div>
      
        {loading ? (
          <div>
            <img src="/loading.gif" alt="Cargando..." />
          </div>
        ) : (
            <p></p>
        )}
    </div>
  );
};

export default MyForm;
