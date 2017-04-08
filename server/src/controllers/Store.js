import db from '../db.js';

export const getAll = () =>
  db.model('Store').findAll()
  .then(stores => stores.map(store => store.get({plain: true}))); 