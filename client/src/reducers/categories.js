import {List, fromJS} from 'immutable';

const reducers = {
  'CATEGORIES.SET': (cart, action) => 
    fromJS(action.categories)
};

export default (categories = List(), action) => {
  return action.type in reducers ? reducers[action.type](categories, action) : categories;
};
