import {Map} from 'immutable';


const reducers = {
  'SUGGESTIONS.SET_API_KEY': 
    (suggestions, {key}) => suggestions.set('apiKey', key),
  'SUGGESTIONS.SET_ADDRESSES': 
    (suggestions, {addresses}) => suggestions.set('addresses', addresses),
  'SUGGESTIONS.CLEAR': 
    (suggestions) => suggestions.delete('addresses'),
  'SUGGESTIONS.SET_ADDRESS_RESTRICT': 
    (suggestions, {locations}) => suggestions.set('locations', locations),
  'SUGGESTIONS.SET_UNWANTED_WORDS':
    (suggestions, {words}) => suggestions.set('unwantedWords', words),
  'SUGGESTIONS.SET_ADDRESS_COUNT':
    (suggestions, {count}) => suggestions.set('count', count)

};

export default (suggestions = Map(), action) => {
  return action.type in reducers ? reducers[action.type](suggestions, action) : suggestions;
};
