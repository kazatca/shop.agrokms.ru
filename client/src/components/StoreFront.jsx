import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getProductIds} from '../selectors/products.js';
import DocumentTitle from './DocumentTitle.jsx';
import Product from './Product.jsx';

export const StoreFront = ({productIds}) => 
  <div className="storefront">
    <DocumentTitle>Магазин</DocumentTitle>
    {productIds.map(id => <Product key={id} id={id} />)}
  </div>;

StoreFront.propTypes = {
  productIds: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  productIds: getProductIds(state)
});

export default connect(mapStateToProps)(StoreFront);
