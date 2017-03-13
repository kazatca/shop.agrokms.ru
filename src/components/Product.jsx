import React, {PureComponent, PropTypes} from 'react';
import Money from './Money';

export default class Product extends PureComponent{

  static propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    addToCart: PropTypes.func.isRequired 
  };
  
  constructor(props){
    super(props);
    this.state = {qty: 1};
  }

  addToCart(){
    this.props.addToCart(this.props.id, this.state.qty);
  }

  changeQty(qty){
    if(isNaN(qty) || qty < 1){
      return;
    }
    this.setState({qty});
  }

  render(){
    return (
      <div className="product">
        <div className="thumbnail">
          <img src={this.props.image} alt="no image"/>
        </div>
        <div>
          <h1 className="name">{this.props.name}</h1>
          <Money className="price">{this.props.price}</Money>
          <button className="minus" 
            onClick={() => this.changeQty(this.state.qty*1 - 1)}>
            -
          </button>
          <input 
            type="text" 
            className="qty" 
            value={this.state.qty}
            onChange={e => this.changeQty(e.target.value*1)}
          />
          <button className="plus" 
            onClick={() => this.changeQty(this.state.qty*1 + 1)}>
            +
          </button>
          <button className="buy"
            onClick={() => this.addToCart()}>
            Buy
          </button>
        </div>
      </div>            
    );
  }
}
