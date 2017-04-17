import {Map} from 'immutable';

const reducers = {
  'USER.SET_NAME': (user, {name}) => user.set('name', name),
  'USER.SET_PHONE': (user, {phone}) => user.set('phone', phone),
  'USER.SET_ADDRESS': (user, {address}) => user.set('address', address),
  'USER.SET_PASSWORD': (user, {password}) => user.set('password', password),
  'USER.CLEAN_PASSWORD': (user) => user.delete('password'),
  'USER.CLEAN_ID': (user) => user.delete('id'),
  'USER.SET': (user, {id, name, phone, address, loggedBy, role}) => 
    Map({
      id,
      name,
      phone,
      address,
      loggedBy,
      role
    })
  
};

const initState = Map({
  name: '',
  phone: '',
  address: '',
  password: ''
});

export default (user = initState, action) => {
  return action.type in reducers ? reducers[action.type](user, action) : user;
};
