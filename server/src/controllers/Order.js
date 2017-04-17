import db from '../db.js';
import {updateUser} from './User.js';

const orderToModel = ({status, user, cart}) => {
  return {
    status,
    UserId: user,
    CartItems: cart.map(({id, qty, price}) => {
      return {
        ProductId: id,
        qty,
        price
      };
    })
  };
};

const orderToPlain = order => {
  const {id, status, UserId, CartItems, createdAt} = order.get({plain: true});
  return {
    id: `${id}`,
    status,
    createdAt,
    user: `${UserId}`,
    cart: CartItems.map(({ProductId, qty, price}) => {
      return {
        id: `${ProductId}`,
        qty,
        price
      };
    })
  };
};

export const getProducts = ids => 
  db.model('Product')
  .findAll({where: {id: {
    in: ids
  }}})
  .then(products => 
    products.map(product => 
      product.get({plain: true})
  ))
  .then(products => 
    products.reduce((result, product) =>{
      result[product.id] = product;
      return result;
    }, {})
  );
  
/*
  transform cart from {1: 5} to 
  [{id: 1, qty: 5, price: <price from db>}]
*/
export const extendCart = cart => {
  const cartIds = Object.keys(cart);

  return getProducts(cartIds)
  .then(products => {
    if(Object.keys(products).length != cartIds.length){
      const notFound = cartIds.filter(id => !(id in products));
      throw new Error(`Product id not found: ${notFound.join(', ')}`);
    }
    return products;
  })
  .then(products => cartIds.map(id => {
    return {
      id,
      qty: cart[id],
      price: products[id].price
    };
  }));
};

export const add = order => 
  updateUser(order.user)
  .then(user => {order.user = user.id;})
  //fix price
  .then(() => extendCart(order.cart))
  .then(cart => {order.cart = cart;})
  //add to db
  .then(() => db.model('Order').create(orderToModel(order), {
    include: [db.model('CartItem')]
  }))
  .then(orderToPlain);

export const getAll = () => {
  return db.model('Order').findAll({
    include: [db.model('CartItem')]
  })
  .then(orders => orders.map(orderToPlain));
};

export const getByUser = userId => {
  return db.model('Order').findAll({
    where: {UserId: userId},
    include: [db.model('CartItem')]
  })
  .then(orders => orders.map(orderToPlain));
};

