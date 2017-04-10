import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

import {add as addToCart} from '../actions/cart.js';
import Product from './Product.jsx';

export class CategoryDummy extends PureComponent {
  static propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.props.category}</title>
        </Helmet>
        {this.props.products.map(product => <Product 
          {...product}
          key={product.id}
          addToCart={this.props.addToCart.bind(this)}
        />)}
      </div>
    );
  }
}

const getProducts = (products, category) => 
  products
    .toArray()
    .filter(product => product.get('category') == category)
    .map(product => product.toJS());

const mapStateToProps = (state, {match}) => {
  const category = state.get('categories').find(category => category.get('id') == match.params.id);
  return {
    products: getProducts(state.get('products'), category.get('id')),
    category: category.get('name')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id, qty) => dispatch(addToCart(id, qty))
  };
};

const Category = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDummy);

export default Category;
