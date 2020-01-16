const { Router } = require('express');

const routes = Router();

routes.post('/users', (req, res) => {
  res.send({ message: 'hello' });
});

module.exports = routes;
