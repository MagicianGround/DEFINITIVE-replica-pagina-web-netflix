import React, { useState } from "react";
import styles from "./section03.module.css";

const Section03 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    } else {
      setOpenIndex(null);
    }
  };

  const faqItems = [
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
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Preguntas frecuentes</h2>
      <div className={styles.faqContainer}>
        {faqItems.map((item, index) => (
          <div key={item.question} className={styles.faqItem}>
            <button
              className={styles.faqButton}
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
              aria-controls={`faq-answer-${index}`} // Mejorar accesibilidad
            >
              {item.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            <div
              id={`faq-answer-${index}`} // Asignar ID dinámico
              className={openIndex === index ? styles.faqAnswerVisible : styles.faqAnswer}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section03;