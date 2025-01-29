import React, { useState } from "react";
import Section01 from './componentsMain/section-01/section-01';
import Section02 from './componentsMain/section-02/section-02';
import Section03 from './componentsMain/section-03/section-03';
import './mainStyles.css'

export default function Main() {
  return (
    <main>
      <section className='background-main-01'>
        <div className="inner-container">
          <Section01 />
        </div>
      </section>
      <section>
      <Section02 />
      </section>
      <section>
        <Section03 />
      </section>
    </main>
    
  );
}