export const setGMapKey = key => {
  return {
    type: 'GOOGLE_MAP_KEY.SET',
    key
  };
};

export const setDadataKey = key => {
  return {
    type: 'DADATA_KEY.SET',
    key
  };
};