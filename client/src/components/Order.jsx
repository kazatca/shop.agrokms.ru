import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Money from './Money.jsx';
import {getTotalQty, getTotalCost} from '../selectors/orders.js';

const Order = ({id, date, totalQty, totalCost, status}) =>
  <div className="order">
    <div className="id">{id}</div>
    <div className="date">{date}</div>
    <div className="total-qty">{totalQty}</div>
    <div className="total-cost"><Money>{totalCost}</Money></div>
    <div className="status">{status}</div>
  </div>;

Order.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.object,
  totalQty: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
};

const mapStateToProps = (state, {id}) => {
  const order = state.getIn(['orders', id]);
  return {
    id,
    date: order.get('date'),
    totalQty: getTotalQty(state, id),
    totalCost: getTotalCost(state, id),
    status: order.get('status')
  };
};

export default connect(mapStateToProps)(Order);
