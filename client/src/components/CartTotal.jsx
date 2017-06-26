import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Money from './Money.jsx';

const CartTotal = ({cost}) =>
  <tr>
    <td colSpan={5} className="total">
      <div>Итого:</div>
      <Money className="cost">{cost}</Money>
    </td>
  </tr>;

CartTotal.propTypes = {
  cost: PropTypes.number.isRequired
};  

//todo: make selector
const mapStateToProps = state => {
  const products = state.get('products');
  return {
    cost: state.get('cart').reduce((result, qty, id) => result + qty * products.get(id).get('price'), 0)
  };
};

export default connect(mapStateToProps)(CartTotal);
