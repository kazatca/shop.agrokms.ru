import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';

import {changeQty, removeItem, removeAll} from '../actions/cart';
import CartItem from './CartItem';
import Money from './Money';


class Total extends PureComponent {
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

export class CartDummy extends PureComponent{

  static propTypes = {
    items: PropTypes.array,
    changeQty: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired
  };

  static defaultProps = {
    items: []
  };

  getTotal(){
    return this.props.items.reduce((total, item) => {
      return {
        cost: total.cost + item.qty * item.price
      };
    }, 
    {cost: 0});
  }

  render(){
    return (
      <table className="cart">
        <tbody>
          {this.props.items.map(item => <CartItem 
            {...item} 
            key={item.id}
            changeQty={(id, qty) => this.props.changeQty(id, qty)}
            removeItem={id=> this.props.removeItem(id)}
          />)}  
          <Total {...this.getTotal()} />
          <tr><td colSpan={5}>
            <button className="removeAll"
              onClick={() => this.props.removeAll()}
            >Убрать все</button>
          </td></tr>
        </tbody>
      </table>
    );
  }
}


const getFullCart = (cart, products) => {
  return cart.map((qty, id) => {
    return {
      ...products.get(id).toJS(),
      qty 
    };
  }).toArray();
};

const mapStateToProps = state => {
  return {
    items: getFullCart(state.get('cart'), state.get('products'))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeQty: (id, qty) => dispatch(changeQty(id, qty)),
    removeItem: id => dispatch(removeItem(id)),
    removeAll: () => dispatch(removeAll())
  };
};

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDummy);

export default Cart;