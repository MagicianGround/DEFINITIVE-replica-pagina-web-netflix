import React from "react";
import styles from "./Section02Styles.module.css";

export default function Section02() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Más motivos para unirte</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Disfruta en tu TV</h3>
            <p className={styles.cardText}>Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Descarga tus series para verlas offline</h3>
            <p className={styles.cardText}>Guarda tu contenido favorito y siempre tendrás algo para ver.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <circle cx="7" cy="7" r="5"></circle>
                <circle cx="17" cy="17" r="5"></circle>
                <path d="M12 17h10"></path>
                <path d="m3.46 10.54 7.08-7.08"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Disfruta donde quieras</h3>
            <p className={styles.cardText}>Películas y series ilimitadas en tu teléfono, tablet, laptop y TV.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Crea perfiles para niños</h3>
            <p className={styles.cardText}>Los niños vivirán aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, gratis con tu membresía.</p>
          </div>
        </div>
      </div>
    </section>
  );
}