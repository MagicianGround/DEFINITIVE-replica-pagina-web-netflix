import React from "react";

import './section01Styles.module.css'

export default function Section01(){
    return(
        <div className="section01">
            <h1>Películas y series ilimitadas y mucho más</h1>
            <p>A partir de US$ 9.99. Cancela cuando quieras.</p>
            <div className="content-email">
                <p>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reactivar tu membresía de Netflix.</p>
                <div>
                    <input type="email" placeholder="Email"/>
                    <button>
                        <a href="">
                            Comenzar
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}