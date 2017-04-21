import {Map} from 'immutable';

const reducers = {
  'GOOGLE_MAP_KEY.SET': (creds, action) => 
    creds.set('google_map', action.key),
  'DADATA_KEY.SET': (creds, action) => 
    creds.set('dadata_key', action.key)
};

export default (creds = Map(), action) => {
  return action.type in reducers ? reducers[action.type](creds, action) : creds;
};