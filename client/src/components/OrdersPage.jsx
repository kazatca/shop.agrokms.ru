import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Order from './Order.jsx';
import {getAll as getOrders} from '../actions/order.js';

export class OrdersPageDummy extends Component {
  static propTypes = {
    orders: PropTypes.array,
    getOrders: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    props.getOrders();
  }

  render() {
    return (
      <div>
        {this.props.orders.map(order => 
          <Order key={order.id} {...order}/>)}        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.get('orders').toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  };
};

const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersPageDummy);
export default OrdersPage;