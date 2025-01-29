import React from 'react'; // Elimina useState si no se usa

import './mainStyles.css'

import Section01 from './componentsMain/section-01/section-01';
import Section02 from './componentsMain/section-02/section-02';
import Section03 from './componentsMain/section-03/section-03';

const Main = () => {
  return (
    <div className='main'>
      <div className='background-main-01'>
        <div className='inner-container'>
          <Section01 />
        </div>
          <Section02 />
          <Section03 />
      </div>
    </div>
  );
};

export default Main;