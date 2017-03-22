import db from '../db';

const model = db.model('Category');

const categoryToPlain = category => {
  const {
    id,
    name
  } = category.get({plain: true});

  return {
    id: `${id}`,
    name
  };
};

export const getAll = () => {
  return db.model('Category').findAll()
  .then(categories => categories.map(categoryToPlain));
};

export const addCategory = category => {
  return model.create(category)
  .then(categoryToPlain);
};
