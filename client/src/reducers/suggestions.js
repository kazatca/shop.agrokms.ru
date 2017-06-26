import {Map} from 'immutable';


export const moveCursor = (suggestions, dir) => {
  const index = suggestions.get('cursor') + dir;
  const count = suggestions.get('addresses', []).length;
  if(!count) return -1;
  if(index < 0) return 0;
  if(index >= count) return count-1;
  return index;
};

const reducers = {
  'SUGGESTIONS.SET_API_KEY': 
    (suggestions, {key}) => suggestions.set('apiKey', key),

  'SUGGESTIONS.SET_ADDRESSES': 
    (suggestions, {addresses}) => 
      suggestions.set('addresses', addresses && addresses.length ? addresses: null),
  
  'SUGGESTIONS.CLEAR': 
    suggestions => suggestions.delete('addresses'),
  
  'SUGGESTIONS.SET_ADDRESS_RESTRICT': 
    (suggestions, {locations}) => suggestions.set('locations', locations),
  
  'SUGGESTIONS.SET_UNWANTED_WORDS':
    (suggestions, {words}) => suggestions.set('unwantedWords', words),
  
  'SUGGESTIONS.SET_ADDRESS_COUNT':
    (suggestions, {count}) => suggestions.set('count', count),
  
  'SUGGESTIONS.MOVE_CURSOR': 
    (suggestions, {dir}) => suggestions.set('cursor', moveCursor(suggestions, dir)),
  
  'SUGGESTIONS.RESET_CURSOR': 
    suggestions => suggestions.set('cursor', -1)
};

export default (suggestions = Map(), action) => {
  return action.type in reducers ? reducers[action.type](suggestions, action) : suggestions;
};
