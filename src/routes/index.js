const routes = require('express').Router();
const swagger = require('./swagger');

routes.get('/', (req, res) => {
    res.json({ message: 'Library API is running' });
});

routes.use('/api-docs', swagger);
routes.use('/contacts', require('./contacts'));
routes.use('/books', require('./books'));

module.exports = routes;