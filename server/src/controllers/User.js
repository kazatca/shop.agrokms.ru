import db from '../db.js';


const userToPlain = user => {
  const {id, name, phone} = user.get({plain: true});
  return {
    id: `${id}`,
    name,
    phone
  };
};

const genPassword = () => {
  return Math.floor(Math.random()*1000000).toString();
};

export const create = ({name, phone}) => {
  const password = genPassword();
  return db.model('User').create({
    name,
    phone,
    password
  })
  .then(userToPlain);
};