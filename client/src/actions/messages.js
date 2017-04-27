
export const set = (key, value) => ({
  type: 'MESSAGES.SET',
  key,
  value
});

export const clear = (key) => ({
  type: 'MESSAGES.CLEAR',
  key
});