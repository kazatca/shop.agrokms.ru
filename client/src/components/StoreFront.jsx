import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {add as addToCart} from '../actions/cart';

import Product from './Product';

export class StoreFrontDummy extends PureComponent {
  static propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        {this.props.products.map(product => <Product 
          {...product}
          key={product.id}
          addToCart={this.props.addToCart.bind(this)}
        />)}
      </div>
    );
  }
}

const getProducts = products => 
  products
    .toArray()
    .map(product => product.toJS());

const mapStateToProps = state => {
  return {
    products: getProducts(state.get('products'))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id, qty) => dispatch(addToCart(id, qty))
  };
};

const StoreFront = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreFrontDummy);

export default StoreFront;
