import app from './app.js';

const port = process.env.PORT;
app.listen(port, ()=> console.log(`go to http://localhost:${port}`));