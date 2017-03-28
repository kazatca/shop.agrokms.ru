import db from '../db.js';


const userToPlain = user => {
  const {id, name, phone} = user.get({plain: true});
  return {
    id: `${id}`,
    name,
    phone
  };
};

export const genTmpPassword = () => {
  return Math.floor(Math.random()*1000000).toString();
};

export const create = user => {
  const password = genPassword();
  return db.model('User').create({
    name,
    phone,
    password
  })
  .then(userToPlain);
};

export const login = (login, password) => 
  db.model('User').findAll({where: {
    phone: login
  }});

export const updateUser = user => 
  db.model('User').findOne({where: {phone: user.phone}})
  .then(instance => {
    if(!instance){
      return db.model('User').create(user);  
    }
    return instance.update(user, {fields: [
      'name', 
      'address'
    ]})
    .then(() => instance);
  })
  .then(instance => instance.get({plain: true}));
