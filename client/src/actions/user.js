

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

