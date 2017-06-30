import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

import {getProductIds} from '../selectors/products.js';
import Product from './Product.jsx';

export const StoreFront = ({productIds}) => 
  <div className="storefront">
    <Helmet>
      <title>Магазин</title>
    </Helmet>
    {productIds.map(id => <Product key={id} id={id} />)}
  </div>;

StoreFront.propTypes = {
  productIds: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  productIds: getProductIds(state)
});

export default connect(mapStateToProps)(StoreFront);
