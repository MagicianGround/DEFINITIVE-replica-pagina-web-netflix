import React from "react";
import styles from "./section01Styles.module.css";

export default function Section01() {
    return (
        <div className={styles.section01}>
            <h1 className={styles.title}>Películas y series ilimitadas y mucho más</h1>
            <p className={styles.subtitle}>A partir de US$ 9.99. Cancela cuando quieras.</p>
            <div className={styles.contentEmail}>
                <p className={styles.description}>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reactivar tu membresía de Netflix.</p>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="email" placeholder="Email" />
                    <button className={styles.button}>
                        Comenzar
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
