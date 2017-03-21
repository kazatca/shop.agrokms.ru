import db from '../db';

const productToPlain = product => {
  const {
    id, 
    name, 
    price,
    CategoryId
  } = product.get({plain: true});

  return {
    id: `${id}`,
    name,
    price,
    category: `${CategoryId}`
  };
};

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

const productToModel = ({id, name, price, category}) => {
  return {
    id,
    name,
    price,
    CategoryId: category
  };
};

export const getAll = () => {
  return Promise.all([
    db.model('Product').findAll(),
    db.model('Category').findAll()
  ])
  .then(([products, categories]) => {
    return {
      products: products
      .map(productToPlain),
      categories: categories
      .map(categoryToPlain)
    };
  });
};

export const addProduct = product => {
  return db.model('Product')
  .create(product)
  .then(productToPlain);
};


export const addCategory = category => {
  return db.model('Category')
  .create(category)
  .then(categoryToPlain);
};

export const changeProduct = (id, productData) => {
  return db.model('Product')
  .findById(id)
  .then(product => {
    if(!product){
      throw 'not found';
    }
    return product.update(productToModel(productData));
  })
  .then(() => db.model('Product').findById(id)) 
  .then(productToPlain);
};