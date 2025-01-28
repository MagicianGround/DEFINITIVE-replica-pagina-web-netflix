import React from 'react'

import './footerStyles.css'

export default function Footer(){
    return(
        <footer className="footer">
            <div className="container">
            <div className="contact-info">
                <p>¿Preguntas? Llama al 1 (800) 605-3722 (USA)</p>
            </div>
            <div className="footer-links">
                <div>
                <ul>
                    <li><span>Preguntas frecuentes</span></li>
                    <li><span>Relaciones con inversionistas</span></li>
                    <li><span>Privacidad</span></li>
                    <li><span>Prueba de velocidad</span></li>
                </ul>
                </div>
                <div>
                <ul>
                    <li><span>Centro de ayuda</span></li>
                    <li><span>Empleo</span></li>
                    <li><span>Preferencias de cookies</span></li>
                    <li><span>Avisos legales</span></li>
                </ul>
                </div>
                <div>
                <ul>
                    <li><span>Cuenta</span></li>
                    <li><span>Formas de ver</span></li>
                    <li><span>Información corporativa</span></li>
                    <li><span>Solo en Verflix</span></li>
                </ul>
                </div>
                <div>
                <ul>
                    <li><span>Prensa</span></li>
                    <li><span>Términos de uso</span></li>
                    <li><span>Contáctanos</span></li>
                </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="language-selector">es</div>
                <p id='Netflix'>Netflix</p>
            </div>
            </div>
        </footer>
    );
}