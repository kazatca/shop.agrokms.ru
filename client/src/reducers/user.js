import {Map} from 'immutable';

const reducers = {
  'USER.SET_NAME': (user, {name}) => user.set('name', name),
  'USER.SET_PHONE': (user, {phone}) => user.set('phone', phone),
  'USER.SET_ADDRESS': (user, {address}) => user.set('address', address)
};

const initState = Map({
  name: '',
  phone: '',
  address: ''
});

export default (user = initState, action) => {
  return action.type in reducers ? reducers[action.type](user, action) : user;
};
