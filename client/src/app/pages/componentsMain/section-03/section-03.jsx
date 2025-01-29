import React, { useState } from "react";
import styles from "./Section03.module.css";

const Section03 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    } else {
      setOpenIndex(null);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Preguntas frecuentes</h2>
      <div className={styles.faqContainer}>
        {[
          {
            question: "¿Qué es Netflix?",
            answer:
              "Netflix es un servicio de streaming que ofrece una amplia variedad de series, películas, títulos de anime, documentales y más en miles de dispositivos conectados a internet.",
          },
          {
            question: "¿Cuánto cuesta Netflix?",
            answer:
              "El precio de Netflix depende del plan que elijas. Consulta los precios actualizados en la página de Netflix.",
          },
          {
            question: "¿Dónde puedo ver Netflix?",
            answer:
              "Netflix se puede ver en muchos dispositivos, como Smart TVs, consolas de videojuegos, computadoras, teléfonos móviles y más.",
          },
        ].map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqButton}
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
            >
              {item.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && <div className={styles.faqAnswer}>{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section03;
