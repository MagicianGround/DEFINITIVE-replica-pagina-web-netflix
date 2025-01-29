import React from "react";
import './section02Styles.css';

export default function Section02() {
  return (
    <section className="px-4 py-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Más motivos para unirte</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6 text-center space-y-4">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv w-8 h-8">
                <rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
            </div>
            <h3 className="font-semibold">Disfruta en tu TV</h3>
            <p className="text-sm text-gray-400">Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 text-center space-y-4">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download w-8 h-8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
            </div>
            <h3 className="font-semibold">Descarga tus series para verlas offline</h3>
            <p className="text-sm text-gray-400">Guarda tu contenido favorito y siempre tendrás algo para ver.</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 text-center space-y-4">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tablets w-8 h-8">
                <circle cx="7" cy="7" r="5"></circle>
                <circle cx="17" cy="17" r="5"></circle>
                <path d="M12 17h10"></path>
                <path d="m3.46 10.54 7.08-7.08"></path>
              </svg>
            </div>
            <h3 className="font-semibold">Disfruta donde quieras</h3>
            <p className="text-sm text-gray-400">Películas y series ilimitadas en tu teléfono, tablet, laptop y TV.</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 text-center space-y-4">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-8 h-8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-semibold">Crea perfiles para niños</h3>
            <p className="text-sm text-gray-400">Los niños vivirán aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, gratis con tu membresía.</p>
          </div>
        </div>
      </div>
    </section>
  );
}