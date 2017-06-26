import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getOrderIds} from '../selectors/orders.js';
import Order from './Order.jsx';

export const OrdersPage = ({orders}) => 
  <div>
    {orders.map(id => 
      <Order key={id} id={id} />)}        
  </div>;

OrdersPage.propTypes = {
  orders: PropTypes.array
};

const mapStateToProps = state => ({
  orders: getOrderIds(state)
});

export default connect(mapStateToProps)(OrdersPage);
