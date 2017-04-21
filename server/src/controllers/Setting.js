import db from '../db.js';

const settingsToPlain = settings => 
  settings.map(setting => setting.get({plain: true}));


export const getAll = () => 
  db.model('Setting').findAll()
  .then(settingsToPlain);
