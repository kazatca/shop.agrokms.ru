import db from '../db.js';

const orderToModel = ({status, user, cart}) => {
  return {
    status,
    UserId: user,
    CartItems: cart.map(({id, qty}) => {
      return {
        ProductId: id,
        qty
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
    cart: CartItems.map(({ProductId, qty}) => {
      return {
        id: `${ProductId}`,
        qty
      };
    })
  };
};

export const add = order => {
  return db.model('Order').create(orderToModel(order), {
    include: [db.model('CartItem')]
  })
  .then(orderToPlain);
};


export const get = () => {
  return db.model('Order').findAll({
    include: [{
      model: db.model('CartItem')
    }]
  })
  .then(orders => orders.map(orderToPlain));
};
