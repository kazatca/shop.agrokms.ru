import React, {Component, PropTypes} from 'react';
import {Helmet} from 'react-helmet';
import GMap from './GMap.jsx';

export default class AboutPage extends Component {
  static propTypes = {
    
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Контакты</title>
        </Helmet>
        <GMap 
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
        />
      </div>
    );
  }
}
