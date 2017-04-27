import {Map} from 'immutable';

const reducers = {
  'MESSAGES.SET': (messages, {key, value}) => 
    messages.set(key, value),
  'MESSAGES.CLEAR': (messages, {key}) => 
    messages.delete(key)
};

export default (messages = Map(), action) => {
  return action.type in reducers ? reducers[action.type](messages, action) : messages;
};
