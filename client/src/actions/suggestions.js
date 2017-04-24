import fetch from 'isomorphic-fetch';

export const setApiKey = key => {
  return {
    type: 'SUGGESTIONS.SET_API_KEY',
    key
  };
};

export const setAddresses = addresses => {
  return {
    type: 'SUGGESTIONS.SET_ADDRESSES',
    addresses
  };
};

export const getAddresses = query => (dispatch, getState) => {
  const apiKey = getState().getIn(['suggestions', 'apiKey']);
  if(!apiKey){
    return Promise.reject('DaData api key not set');
  }
  return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${apiKey}` 
    },
    body: JSON.stringify({query, count: 5})
  })
  .then(resp => resp.json())
  .then(resp => dispatch(setAddresses(resp.suggestions)));
};

