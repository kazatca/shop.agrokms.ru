
const reducers = {
  'STATUS.SET': (_, {status}) => status
};

export default (status = 200, action) => {
  return action.type in reducers ? reducers[action.type](status, action) : status;
};
