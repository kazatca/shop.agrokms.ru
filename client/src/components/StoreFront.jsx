import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

import {getProductIds} from '../selectors/products.js';
import Product from './Product.jsx';
import dataConnect from '../data-connect.js';

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

export default 
  dataConnect('/products/all')(
    connect(mapStateToProps)(
      StoreFront
    )
  );
