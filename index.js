const express = require('express');
const UserRouter = require('./routes/user');
const LoginRouter = require('./routes/login');
const CategoryRouter = require('./routes/category');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserRouter);

app.use('/login', LoginRouter);

app.use('/categories', CategoryRouter);

app.use(errorMiddleware);
