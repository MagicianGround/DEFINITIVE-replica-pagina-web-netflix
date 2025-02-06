import React, { useState } from "react";
import styles from "./Tarjeta.module.css";
import URLEnvio from './URL.js';

export default function TarjetaPago({ onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Formatea el número de tarjeta: elimina caracteres no numéricos, añade un espacio cada 4 dígitos y limita a 19 caracteres.
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  // Formatea la fecha de vencimiento insertando la barra automáticamente.
  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 4);
    if (cleanedValue.length >= 3) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    }
    return cleanedValue;
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  // Validación de la fecha de vencimiento:
  // Se considera válida solo si el mes/año son estrictamente posteriores al mes y año actuales.
  const isValidExpiryDate = (expiryDate) => {
    if (!expiryDate.includes("/")) return false;
    const [monthStr, yearStr] = expiryDate.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JS son 0-indexados
    const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2), 10);

    if (year < currentYear) return false;
    if (year === currentYear && month <= currentMonth) return false; // No permite vencimiento este mismo mes
    return true;
  };

  // Implementación del algoritmo de Luhn para validar el número de tarjeta.
  const isValidCardLuhn = (number) => {
    const digits = number.split("").reverse().map(d => parseInt(d, 10));
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // Validación de los campos y envío del formulario.
  const validateAndSubmit = async (e) => {
    e.preventDefault();

    // Se elimina los espacios para la validación.
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    let validationErrors = {};

    if (!cardNumberRegex.test(cleanedCardNumber)) {
      validationErrors.cardNumber = "Ingrese un número de tarjeta válido de 16 dígitos";
    } else if (!isValidCardLuhn(cleanedCardNumber)) {
      validationErrors.cardNumber = "El número de tarjeta no cumple con el algoritmo de Luhn";
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
      const response = await fetch(`${URLEnvio}/api/enviar`, {
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
