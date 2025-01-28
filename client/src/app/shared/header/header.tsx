import React from "react";
import './headerStyles.css';

export default function Header(/*{ onLoginClick }*/) {
  return (
    <header className="bg-gradient-to-b from-black to-transparent">
      <a href="">
        <img src="Logo-Netflix.png" alt="Logo" width="95px" />
      </a>
      <nav>
        <select name="Dropdown" id="Lenguaje">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <button id="IniciarSesion" >
          <a href="">Iniciar Sesión</a>
        </button>
      </nav>
    </header>
  );
}
