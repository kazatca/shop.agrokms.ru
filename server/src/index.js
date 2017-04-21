import app from './app.js';

const port = process.env.PORT;
console.log('NODE_ENV =', process.env.NODE_ENV);
app.listen(port, ()=> console.log(`go to http://localhost:${port}`));