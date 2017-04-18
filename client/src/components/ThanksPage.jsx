import React, {Component, PropTypes} from 'react';
import {Helmet} from 'react-helmet';

export default class ThanksPage extends Component {
  static propTypes = {
    
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Спасибо за покупку</title>
        </Helmet>  
        <div>
          Спасибо за покупку. Мы свяжемся с вами в ближайшее время.
        </div>
      </div>
    );
  }
}
