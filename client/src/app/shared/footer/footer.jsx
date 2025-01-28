import React from 'react';
import styles from './footerStyles.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contactInfo}>
                    <p>¿Preguntas? Llama al 1 (800) 605-3722 (USA)</p>
                </div>
                <div className={styles.footerLinks}>
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
                <div className={styles.footerBottom}>
                    <div className={styles.languageSelector}>es</div>
                    <p className={styles.netflix}>Netflix</p>
                </div>
            </div>
        </footer>
    );
}
