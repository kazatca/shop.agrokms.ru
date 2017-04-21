
export const setAll = settings => {
  return {
    type: 'SETTINGS.SET',
    settings
  };
};

export const setValue = (key, value) => {
  return {
    type: 'SETTINGS.SET_VALUE',
    key,
    value
  };
};