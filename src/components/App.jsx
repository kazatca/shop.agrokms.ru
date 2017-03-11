import React, {Component, PropTypes} from 'react';
import Product from './Product';

const product = {
  name: 'Coffee',
  price: 15,
  image: '//i.imgur.com/bFdWQbi.jpg'
};


export default class App extends Component{
  render(){
    return (
      <Product {...product} /> 
    );
  }
}