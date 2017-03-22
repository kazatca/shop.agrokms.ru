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


const productToModel = ({id, name, price, category}) => {
  return {
    id,
    name,
    price,
    CategoryId: category
  };
};

export const getAll = () => {
  return db.model('Product').findAll()
  .then(products => products.map(productToPlain));
};

export const addProduct = product => {
  return db.model('Product')
  .create(product)
  .then(productToPlain);
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