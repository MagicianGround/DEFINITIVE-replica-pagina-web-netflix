import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="Netflix.com">
        <img src="Logo-Netflix.png" alt="Logo" width="95px" />
      </a>
      <nav className={styles.nav}>
        <select name="Dropdown" id="Lenguaje" className={styles.select}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <button className={styles.IniciarSesion}>
          <a href="">Iniciar Sesión</a>
        </button>
      </nav>
    </header>
  );
}
