import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Money from './Money.jsx';
import {add as addToCart} from '../actions/cart.js';

export class Product extends Component{
  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    addToCart: PropTypes.func.isRequired 
  };
  
  constructor(props){
    super(props);
    this.state = {qty: 1};
  }

  changeQty(qty){
    if(isNaN(qty) || qty < 1){
      return;
    }
    this.setState({qty});
  }

  render(){
    const {name, image, price, addToCart} = this.props;
    const {qty} = this.state;
    return (
      <div className="product">
        <div className="thumbnail">
          <img src={image} alt={name} title={name}/>
        </div>
        <div>
          <h2 className="name">{name}</h2>
          <Money className="price">{price}</Money>
          <button className="minus" 
            onClick={() => this.changeQty(qty*1 - 1)}>
            -
          </button>
          <input 
            type="text" 
            className="qty" 
            value={qty}
            onChange={({target}) => this.changeQty(target.value*1)}
            onFocus={({target}) => target.select()}
          />
          <button className="plus" 
            onClick={() => this.changeQty(qty*1 + 1)}>
            +
          </button>
          <button className="buy"
            onClick={() => addToCart(qty)}>
            В корзину
          </button>
        </div>
      </div>            
    );
  }
}

const mapStateToProps = (state, {id}) => {
  const product = state.getIn(['products', id]);
  return {
    name: product.get('name'),
    image: product.get('image'),
    price: product.get('price')
  };
};

const mapDispatchToProps = (dispatch, {id}) => ({
  addToCart: qty => dispatch(addToCart(id, qty))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
