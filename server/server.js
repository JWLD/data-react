const Express = require('express');
const CookieParser = require('cookie-parser');
const router = require('./controllers/router.js');

const app = Express();

app.set('port', process.env.PORT || 3000);

app.use(CookieParser());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

app.use(router);

module.exports = app;
