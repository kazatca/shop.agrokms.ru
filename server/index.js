import express from 'express';
import renderPage from './src/renderPage';

const app = express();
const port = 3000;

app.use(express.static('../client/dist', {index: false}));
app.use((req, res) => res.send(renderPage(req.path)));

app.listen(port, ()=> console.log(`go to http://localhost:${port}`));