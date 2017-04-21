import {Map} from 'immutable';

const reducers = {
  'SETTINGS.SET_VALUE': (settings, {key, value}) => 
    settings.setIn(key, value),
  'SETTINGS.SET': (_, {settings}) => settings.reduce((result, {key, value}) => 
    result.setIn(key.split('.'), value), Map())
};

export default (settings = Map(), action) => {
  return action.type in reducers ? reducers[action.type](settings, action) : settings;
};
