
export const add = (id, qty) =>{
  return {
    type: 'CART.ADD',
    id,
    qty
  };
};

export const changeQty = (id, qty) => {
  return {
    type: 'CART.CHANGE_QTY',
    id,
    qty
  };
};


export const removeItem = id => {
  return {
    type: 'CART.REMOVE_ITEM',
    id
  };
};

export const removeAll = () => {
  return {
    type: 'CART.REMOVE_ALL'
  };
};