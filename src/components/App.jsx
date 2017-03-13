import React, {Component} from 'react';

import Cart from './Cart';
import StoreFront from './StoreFront';


export default class App extends Component{
  render(){
    return (
      <div>
        <Cart />
        <StoreFront />
      </div>
    );
  }
}
