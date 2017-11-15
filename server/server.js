const express = require('express');

const router = require('./controllers/router.js');

const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  next();
});

app.use(router);

module.exports = app;
