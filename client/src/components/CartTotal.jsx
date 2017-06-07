import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';

import Money from './Money.jsx';

export class CartTotalDummy extends PureComponent {
  static propTypes = {
    cost: PropTypes.number.isRequired
  };  

  render() {
    return (
      <tr>
        <td colSpan={5} className="total">
          <div>Итого:</div>
          <Money className="cost">{this.props.cost}</Money>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  const products = state.get('products');
  return {
    cost: state.get('cart').reduce((result, qty, id) => result + qty * products.get(id).get('price'), 0)
  };
};

const CartTotal = connect(mapStateToProps)(CartTotalDummy);
export default CartTotal;


