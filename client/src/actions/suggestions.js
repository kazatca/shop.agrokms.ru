import request from '../services/dadata.js';
import {getSettings} from '../selectors/settings.js';

export const setAddresses = addresses => dispatch => {
  dispatch({type: 'SUGGESTIONS.SET_ADDRESSES', addresses});
  dispatch({type: 'SUGGESTIONS.RESET_CURSOR'});
};

export const getAddresses = query => (dispatch, getState) => {
  if(getState().getIn(['user', 'address']) == query) return;
  
  const settings = getSettings(getState(), ['suggestions', 'address']);

  if(!settings || !settings.apiKey) return;

  return request(query, settings)
    .then(addresses => addresses.map(({value}) => value))
    .then(addresses => dispatch(setAddresses(addresses)));
};

export const clear = () => dispatch => {
  dispatch({type: 'SUGGESTIONS.CLEAR'});
  dispatch({type: 'SUGGESTIONS.RESET_CURSOR'});
};

export const moveCursor = dir => (dispatch, getState) => {
  const dirs = {up: -1, down: 1};
  
  dispatch({type: 'SUGGESTIONS.MOVE_CURSOR', dir: dirs[dir]});

  const cursor = getState().getIn(['suggestions', 'cursor']);
  const addresses = getState().getIn(['suggestions', 'addresses']);
  if(addresses && addresses.length && cursor >= 0 && cursor < addresses.length){
    dispatch({type: 'USER.SET_ADDRESS', address: addresses[cursor]});
  }
};