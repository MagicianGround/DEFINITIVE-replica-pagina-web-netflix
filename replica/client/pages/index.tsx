import React, { useEffect, useState } from "react";
import Main from "./page/main/main"; // Asegúrate de que Main comience con mayúscula
import Header from "./shared/header/header";
import Footer from "./shared/footer/footer";

import LoginFalso from "./shared/loginFalso/loginGiovanni/loginFalso"

function Index() {
  
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []); // Agrega un arreglo de dependencias vacío para que el efecto se ejecute solo una vez
  
  return (
    <div className="main">
      <Header />
      <div>
        <LoginFalso />
        <Main />
      </div>
      <Footer /> 
      <h1>{message}</h1>
    </div>
  );
}

export default Index;