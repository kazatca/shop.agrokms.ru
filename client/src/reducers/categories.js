import {OrderedMap, Map} from 'immutable';

const reducers = {
  'CATEGORIES.SET': (cart, {categories}) => 
    OrderedMap(categories.map(category => [category.id, Map(category)]))
};

export default (categories = OrderedMap(), action) => {
  return action.type in reducers ? reducers[action.type](categories, action) : categories;
};
