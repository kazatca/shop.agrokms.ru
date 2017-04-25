import fetch from 'isomorphic-fetch';

export const setAddresses = addresses => {
  return {
    type: 'SUGGESTIONS.SET_ADDRESSES',
    addresses
  };
};

export const stripSuggestions = (patterns = [], resp) => {
  resp.suggestions = resp.suggestions.map(item => {
    item.value = patterns.reduce((result, pattern) => result.replace(pattern, ''), item.value)
    .replace(/^[\s,]+/, ''); //replace ', , '  from head
    return item;
  });
  return resp;  
};


export const getAddresses = query => (dispatch, getState) => {
  const getSetting = key => 
    getState().getIn(['settings', 'suggestions', 'address', key]);

  const apiKey = getSetting('apiKey');
  if(!apiKey){
    return Promise.reject('DaData api key not set');
  }

  const request = {
    query,
    count: getSetting('count') || 5
  };

  const locations = getSetting('locations');
  if(locations){
    request.locations = locations;
    request.restrict_value = true;
  }

  return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${apiKey}` 
    },
    body: JSON.stringify(request)
  })
  .then(resp => resp.json())
  .then(resp => stripSuggestions(getSetting('unwantedWords'), resp))
  .then(resp => dispatch(setAddresses(resp.suggestions)));
};

export const clear = () => ({
  type: 'SUGGESTIONS.CLEAR'
});