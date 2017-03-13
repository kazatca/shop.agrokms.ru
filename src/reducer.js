import {Map, List, OrderedMap} from 'immutable';
import cartReducer from './reducers/cart';
import productsReducer from './reducers/products';


const reducers = {
  'CART.ADD': (state, action) => {
    return state.update('cart', cart => 
      cartReducer.add(cart, action.id, action.qty)
    );
  },
  'CART.CHANGE_QTY': (state, action) => {
    return state.update('cart', cart => 
      cartReducer.changeQty(cart, action.id, action.qty)
    );
  },
  'CART.REMOVE_ITEM': (state, action) => {
    return state.update('cart', cart => 
      cartReducer.removeItem(cart, action.id)
    );
  },
  'CART.REMOVE_ALL': (state, action) => {
    return state.update('cart', cart => 
      cartReducer.removeAll(cart)
    );
  },

  'PRODUCTS.SET': (state, action) => {
    return state.update('products', products=>
      productsReducer.set(action.products)
    );
  }
};

const makeInitialState = (state = {}) => Map({
  cart: OrderedMap(state.cart || {}), 
  products: List(state.products || [])
});

const reducer = (state = makeInitialState(), action) => {
  return action.type in reducers ? 
    reducers[action.type](state, action) : 
    state;
};

export default reducer;
