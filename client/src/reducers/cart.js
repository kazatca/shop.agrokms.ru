import {OrderedMap} from 'immutable';

const add = (cart, id, qty) => 
  cart.set(id, cart.get(id, 0) + qty);

const changeQty = (cart, id, qty) => 
  cart.set(id, qty);

const removeItem = (cart, id) => 
  cart.delete(id);

const removeAll = () => 
  OrderedMap();


const reducers = {
  'CART.ADD': (cart, action) => 
    add(cart, action.id, action.qty),
  'CART.CHANGE_QTY': (cart, action) => 
    changeQty(cart, action.id, action.qty),
  'CART.REMOVE_ITEM': (cart, action) => 
    removeItem(cart, action.id),
  'CART.REMOVE_ALL': (cart, action) => 
    removeAll()
};

export default (cart = OrderedMap(), action) => {
  return action.type in reducers ? reducers[action.type](cart, action) : cart;
};
