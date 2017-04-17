import React, {Component, PropTypes} from 'react';
import Money from './Money.jsx';

export default class Order extends Component {
  static propTypes = {
    id: PropTypes.string,
    cart: PropTypes.array,
    date: PropTypes.object,
    status: PropTypes.string
  };

  getTotalCost(){
    return this.props.cart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  getTotalQty(){
    return this.props.cart.reduce((total, item) => total + item.qty, 0);
  }

  render() {
    return (
      <div className="order">
        <div className="id">{this.props.id}</div>
        <div className="date">{this.props.date}</div>
        <div className="total-qty">{this.getTotalQty()}</div>
        <div className="total-cost"><Money>{this.getTotalCost()}</Money></div>
        <div className="status">{this.props.status}</div>
      </div>
    );
  }
}
