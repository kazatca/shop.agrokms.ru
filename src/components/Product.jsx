import React, {Component, PropTypes} from 'react';


export default class Product extends Component{
  
  constructor(props){
    super(props);
    this.state = {qty: 1};
  }
  addToCart(){
    this.props.addToCart(this.props.id, this.state.qty);
  }

  decrement(){
    if(this.state.qty <= 1){
      return;
    }

    this.setState({
      qty: this.state.qty - 1
    });
  }

  increment(){
    this.setState({
      qty: this.state.qty + 1
    });
  }


  render(){
    return (
      <div className="product">
        <div className="thumbnail">
          <img src={this.props.image} alt="no image"/>
        </div>
        <div>
          <h1 className="name">{this.props.name}</h1>
          <div className="price">{this.props.price} р.</div>
          <button className="minus" 
            onClick={() => this.decrement()}>
            -
          </button>
          <input type="text" className="qty" value={this.state.qty}/>
          <button className="plus" 
            onClick={() => this.increment()}>
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

Product.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired 
};