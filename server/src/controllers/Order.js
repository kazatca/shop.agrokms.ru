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
  const {id, status, UserId, CartItems} = order.get({plain: true});
  return {
    id: `${id}`,
    status,
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
  
export const add = order => 
  updateUser(order.user)
  .then(user => {order.user = user.id;})
  //fix price
  .then(() => getProducts(order.cart.map(cartItem => cartItem.id)))
  .then(products => order.cart.forEach(cartItem => {
    if(!products[cartItem.id]){
      throw new Error('Product not found');
    }
    cartItem.price = products[cartItem.id].price;
  }))
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

