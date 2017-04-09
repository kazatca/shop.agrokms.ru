import {fromJS, List} from 'immutable';

const reducers = {
  'STORES.SET': (stores, action) => 
    fromJS(action.stores)
};

export default (stores = List(), action) => {
  return action.type in reducers ? reducers[action.type](stores, action) : stores;
};
