const express = require('express');
const UserRoutes = require('./routes/user');
const LoginRoutes = require('./routes/login');
const CategoryRoutes = require('./routes/category');
const BlogPostRoutes = require('./routes/blogPost');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserRoutes);

app.use('/login', LoginRoutes);

app.use('/categories', CategoryRoutes);

app.use('/post', BlogPostRoutes);

app.use(errorMiddleware);
