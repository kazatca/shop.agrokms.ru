import db from '../src/db.js';

export const init = () => 
  db.sync({force: true});

export const truncate = (...models) => 
  Promise.all(models.map(model => db.model(model).truncate()));
