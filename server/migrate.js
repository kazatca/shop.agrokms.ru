import db from './src/db.js';
console.log(process.env);
db.sync({force: true})
.then(() => db.close());