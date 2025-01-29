import React from 'react'; // Elimina useState si no se usa

import './mainStyles.css'

import Section01 from './componentsMain/section-01/section-01';
import Section02 from './componentsMain/section-02/section-02';
import Section03 from './componentsMain/section-03/section-03';

const Main = () => {
  return (
    <>
      <Section01 />
      <Section02 />
      <Section03 />
    </>
  );
};

export default Main;