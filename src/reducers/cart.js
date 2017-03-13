import {OrderedMap} from 'immutable';

export default {
  add: (cart, id, qty) => {
    return cart.set(id, cart.get(id, 0) + qty);
  },

  changeQty: (cart, id, qty) => {
    return cart.set(id, qty);
  },

  removeItem: (cart, id) => {
    return cart.delete(id);
  },

  removeAll: (cart) => {
    return OrderedMap();
  }
};