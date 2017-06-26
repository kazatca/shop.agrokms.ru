import fetch from 'isomorphic-fetch';

export const stripSuggestions = (patterns = [], suggestions) => 
  suggestions.map(({value, ...item}) => ({
    ...item,
    value: patterns
      .reduce((result, pattern) => result.replace(pattern, ''), value)
      .replace(/^[\s,]+/, '') //replace ', , '  from head
  }));


const request = (query, settings = {}) => {
  if(!settings.apiKey){
    return Promise.reject('DaData api key not set');
  }

  const request = {
    query,
    count: settings.count || 5
  };

  if(settings.locations){
    request.locations = settings.locations;
    request.restrict_value = true;
  }

  return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${settings.apiKey}` 
    },
    body: JSON.stringify(request)
  })
  .then(resp => resp.json())
  .then(resp => resp.suggestions)
  .then(suggestions => stripSuggestions(settings.unwantedWords, suggestions));
};

export default request;