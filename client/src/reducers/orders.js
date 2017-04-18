import {List, fromJS} from 'immutable';

const reducers = {
  'ORDERS.SET': (_, {orders}) => fromJS(orders)
};

export default (orders = List(), action) => {
  return action.type in reducers ? reducers[action.type](orders, action) : orders;
};
