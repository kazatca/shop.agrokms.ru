import bcrypt from 'bcryptjs';
import db from '../db.js';
// import * as sms from '../sms.js';


const userToPlain = user => {
  const {id, name, phone, role} = user.get({plain: true});
  return {
    id: `${id}`,
    name,
    phone,
    role
  };
};

export const getHash = text => 
  bcrypt.hash(text, 10);

export const compareHash = (text, hash) => 
  bcrypt.compare(text, hash);

export const genTmpPassword = () => {
  return Math.floor(Math.random()*900000 + 100000).toString();
};

export const get = id => 
  db.model('User').findById(id)
  .then(userToPlain);

export const create = user => {
  return Promise.resolve()
  .then(() => {
    if(user.password){
      return getHash(user.password)
      .then(hash => {user.password = hash;});
    }
  })
  .then(() => db.model('User').create(user))
  .then(userToPlain);
};


export const login = (login, password) => 
  db.model('User').findOne({where: {
    phone: login
  }})
  .then(user => {
    if(!user){
      return;
    }
    
    if(user.tmpPassword !== null && user.tmpPassword === password){
      return user.update({tmpPassword: null})
      .then(() => {
        return {
          ...userToPlain(user), 
          loggedBy: 'tmpPassword'
        };
      });
    }

    return compareHash(password, user.password)
    .then(res => {
      if(res){
        return {
          ...userToPlain(user),
          loggedBy: 'password'
        };
      }
    });
  });

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

export const setTmpPassword = phone => 
  db.model('User').findOne({where: {phone}})
  .then(user => {
    if(!user){
      return;
    }
    return user.update({tmpPassword: genTmpPassword()});
  });

