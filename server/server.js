const Express = require('express');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const router = require('./controllers/router.js');

const app = Express();

app.set('port', process.env.PORT || 3000);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(CookieParser());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(router);

module.exports = app;
