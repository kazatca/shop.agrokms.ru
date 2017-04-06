import React, {Component, PropTypes} from 'react';
import Money from './Money.jsx';

export default class CartItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    qty: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    price: PropTypes.number.isRequired,
    changeQty: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  };

  changeQty(qty){
    if(qty < 0){
      return;
    }
    this.props.changeQty(this.props.id, qty);
  }

  removeItem(){
    this.props.removeItem(this.props.id);
  }

  render() {
    return (
      <tr className="cart-item">
        <td className="image">
          <img src={this.props.image} alt=""/>
        </td>
        <td className="name">{this.props.name}</td>
        <td >
          <Money className="price">{this.props.price}</Money>
        </td>
        <td className="qty">
          <button 
            className="minus" 
            onClick={() => this.changeQty(this.props.qty*1 - 1)}
          >-</button>
          <input 
            type="text" 
            value={this.props.qty} 
            onChange={e => this.changeQty(e.target.value)}
            onFocus={e => e.target.select()}
          />
          <button 
            className="plus" 
            onClick={() => this.changeQty(this.props.qty*1 + 1)}
          >+</button>
        </td>
        <td>
          <Money className="cost">{this.props.price * this.props.qty}</Money>
        </td>
        <td>
          <button 
            className="remove" 
            onClick={() => this.removeItem()}
          >remove</button>
        </td>
      </tr>
    );
  }
}

