import React, { useState } from 'react';
import './section03Styles.css';

const Section03: React.FC = () => {
  // Estado para saber qué botón está abierto
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Función para manejar el clic en los botones
  const handleToggle = (index: number) => {
    // Si el botón clickeado es el que ya está abierto, lo cerramos
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      // De lo contrario, abrimos el botón clickeado
      setOpenIndex(index);
    }
  };

  return (
    <section className="px-4 py-16 max-w-4xl mx-auto">
      <h2 className="PreguntasFrecuentes">Preguntas frecuentes</h2>
      <div className="space-y-4">
        <div className="bg-zinc-800">
          <button
            className="px-6 py-4 w-full text-left flex justify-between items-center"
            onClick={() => handleToggle(0)} // Pasamos el índice del botón
          >
            ¿Qué es Netflix?<span>{openIndex === 0 ? '-' : '+'}</span>
          </button>
          {openIndex === 0 && (
            <div className="px-6 py-4">
              Netflix es un servicio de streaming que ofrece una amplia variedad de series, películas, títulos de anime, documentales y más en miles de dispositivos conectados a internet.
            </div>
          )}
        </div>

        <div className="bg-zinc-800">
          <button
            className="px-6 py-4 w-full text-left flex justify-between items-center"
            onClick={() => handleToggle(1)} // Pasamos el índice del botón
          >
            ¿Cuánto cuesta Netflix?<span>{openIndex === 1 ? '-' : '+'}</span>
          </button>
          {openIndex === 1 && (
            <div className="px-6 py-4">
              El precio de Netflix depende del plan que elijas. Consulta los precios actualizados en la página de Netflix.
            </div>
          )}
        </div>

        <div className="bg-zinc-800">
          <button
            className="px-6 py-4 w-full text-left flex justify-between items-center"
            onClick={() => handleToggle(2)} // Pasamos el índice del botón
          >
            ¿Dónde puedo ver Netflix?<span>{openIndex === 2 ? '-' : '+'}</span>
          </button>
          {openIndex === 2 && (
            <div className="px-6 py-4">
              Netflix se puede ver en muchos dispositivos, como Smart TVs, consolas de videojuegos, computadoras, teléfonos móviles y más.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section03;
