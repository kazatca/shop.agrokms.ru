import React from 'react';

import DocumentTitle from './DocumentTitle.jsx';
import GMap from './GMap.jsx';

const AboutPage = () =>
  <div>
    <DocumentTitle>Контакты</DocumentTitle>
    <GMap />
  </div>;

export default AboutPage;
/*
          center={{
            lat: 50.570747, 
            lng: 137.016390
          }}
          markers={[{
            lat: 50.560913,
            lng: 137.028055,
            text: 'Базовая, 5'
          }, {
            lat: 50.574886,
            lng: 137.001833,
            text: 'Северное шоссе, 6'
          }]}

*/