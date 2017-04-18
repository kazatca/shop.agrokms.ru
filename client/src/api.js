import {polyfill as promisePolyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';

promisePolyfill();

const request = (url, ops) => 
  fetch(`//${window.location.host}/api${url}`, {
    credentials: 'same-origin',
    ...ops
  })
  .then(resp => {
    if(resp.status >= 400){
      throw new Error(resp.status);
    }
    return resp;
  })
  .then(resp => {
    const contentType = resp.headers.get("content-type");
    if(/json/.test(contentType)){ 
      return resp.json();
    }
    return resp.text();
  });

export const get = (url, ops) => 
  request(url, ops);

export const post = (url, data, ops) => 
  request(url, {
    ...ops,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

export const put = (url, data, ops) => 
  request(url, {
    ...ops,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

export const del = (url, ops) => 
  request(url, {
    ...ops,
    method: 'DELETE'
  });
