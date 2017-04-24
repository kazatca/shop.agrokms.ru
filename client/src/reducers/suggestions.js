import {Map} from 'immutable';


const reducers = {
  'SUGGESTIONS.SET_API_KEY': (suggestions, {key}) => suggestions.set('apiKey', key),
  'SUGGESTIONS.SET_ADDRESSES': (suggestions, {addresses}) => suggestions.set('addresses', addresses)
};

export default (suggestions = Map(), action) => {
  return action.type in reducers ? reducers[action.type](suggestions, action) : suggestions;
};
