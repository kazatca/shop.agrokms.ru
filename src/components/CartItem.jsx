import React, {Component, PropTypes} from 'react';

export default class CartItem extends Component {

  changeQty(qty){
    if(qty < 0 || isNaN(qty)){
      return;
    }
    this.props.changeQty(this.props.id, qty);
  }

  remove(){
    this.props.remove(this.props.id);
  }

  render() {
    return (
      <tr className="cart-item">
        <td className="image">
          <img src={this.props.image} alt=""/>
        </td>
        <td className="name">{this.props.name}</td>
        <td className="price">{this.props.price} р.</td>
        <td className="qty">
          <button 
            className="minus" 
            onClick={() => this.changeQty(this.props.qty*1 - 1)}
          >-</button>
          <input 
            type="text" 
            value={this.props.qty} 
            onChange={e => this.changeQty(e.target.value)} 
          />
          <button 
            className="plus" 
            onClick={() => this.changeQty(this.props.qty*1 + 1)}
          >+</button>
        </td>
        <td className="cost">{this.props.price * this.props.qty} р.</td>
        <td>
          <button 
            className="remove" 
            onClick={() => this.remove()}
          >remove</button>
        </td>
      </tr>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  qty: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  price: PropTypes.number.isRequired,
  changeQty: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};