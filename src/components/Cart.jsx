import React, {Component, PropTypes} from 'react';
import CartItem from './CartItem';


class Total extends Component {
  render() {
    return (
      <tr>
        <td colSpan={5} className="total">
          <div>Итого:</div>
          <div className="cost">{this.props.cost} р.</div>
        </td>
      </tr>
    );
  }
}

Total.propTypes = {
  cost: PropTypes.number.isRequired
};

export default class Cart extends Component{

  constructor(props){
    super(props);
    this.state = {items: this.props.items};
  }

  changeQty(id, qty){
    this.setState({items: this.state.items.map(item =>
      item.id == id ? {...item, qty} : item
    )});
  }

  remove(id){
    this.setState({items: this.state.items.filter(item => item.id != id)});
  }

  getTotal(){
    return this.state.items.reduce((total, item) => {
      return {
        cost: total.cost + item.qty * item.price
      };
    }, 
    {cost: 0});
  }

  render(){
    return (
      <table>
        <tbody>
          {this.state.items.map(item => <CartItem 
            {...item} 
            key={item.id}
            changeQty={(id, qty) => this.changeQty(id, qty)}
            remove={id=> this.remove(id)}
          />)}  
          <Total {...this.getTotal()} />
        </tbody>
      </table>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.array.isRequired
};
