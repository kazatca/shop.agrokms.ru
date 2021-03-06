import Sequelize from 'sequelize';
import productSchema from './models/Product';
import orderSchema from './models/Order.js';
import cartItemSchema from './models/CartItem.js';
import userSchema from './models/User.js';
import categorySchema from './models/Category.js';
import storeSchema from './models/Store.js';
import settingSchema from './models/Setting.js';

const ops = {
  charset: 'UTF8'
};
if(process.env.NODE_ENV != 'development'){
  ops.logging = false;
}

const db = new Sequelize(process.env.DB_URL, ops);
productSchema(db);
orderSchema(db);
cartItemSchema(db);
userSchema(db);
categorySchema(db);
storeSchema(db);
settingSchema(db);

db.model('Order').hasMany(db.model('CartItem'), {
  constraints: false
});

db.model('Category').hasMany(db.model('Product'), {
  constraints: false
});

db.model('Product').belongsTo(db.model('Category'), {
  constraints: false
});

db.model('Order').belongsTo(db.model('User'), {
  constraints: false
});

export default db;
