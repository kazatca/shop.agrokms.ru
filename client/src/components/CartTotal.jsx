import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Money from './Money.jsx';
import {getCost} from '../selectors/cart.js';

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

const mapStateToProps = state => ({
  cost: getCost(state)
});

export default connect(mapStateToProps)(CartTotal);
