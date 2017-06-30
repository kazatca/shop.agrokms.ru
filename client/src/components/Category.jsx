import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

import {getProductsInCategory} from '../selectors/category.js';
import Product from './Product.jsx';

const Category = ({productIds, categoryName}) =>
  <div>
    <Helmet>
      <title>{categoryName}</title>
    </Helmet>
    {productIds.map(id => <Product key={id} id={id} />)}
  </div>;

Category.propTypes = {
  productIds: PropTypes.array.isRequired,
  categoryName: PropTypes.string.isRequired
};

const mapStateToProps = (state, {match}) => { //match from router
  const categoryId = match.params.id;
  return {
    productIds: getProductsInCategory(state, categoryId),
    categoryName: state.getIn(['categories', categoryId, 'name'])
  };
};

export default connect(mapStateToProps)(Category);
