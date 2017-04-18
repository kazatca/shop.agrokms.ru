import * as api from '../api.js';
import {push} from 'react-router-redux';

export const set = user => {
  return {
    type: 'USER.SET',
    ...user
  };
};

export const setName = name => {
  return {
    type: 'USER.SET_NAME',
    name
  };
};

export const setPhone = phone => {
  return {
    type: 'USER.SET_PHONE',
    phone
  };
};

export const setAddress = address => {
  return {
    type: 'USER.SET_ADDRESS',
    address
  };
};

export const setPassword = password => {
  return {
    type: 'USER.SET_PASSWORD',
    password
  };
};

export const cleanPassword = () => {
  return {
    type: 'USER.CLEAN_PASSWORD'
  };
};

export const cleanId = () => {
  return {
    type: 'USER.CLEAN_ID'
  };
};

export const login = () => (dispatch, getState) => {
  const user = getState().get('user');
  return api.post('/user/login', {
    login: user.get('phone'),
    password: user.get('password')
  })
  .catch(err => {
    return null;
  })
  .then(user => {
    dispatch(cleanPassword());
    if(user){
      dispatch(set(user));
    }
  });
};

export const logout = () => (dispatch, getState) => {
  return api.post('/user/logout')
  .then(dispatch(cleanId()))
  .then(dispatch(push('/')));
};