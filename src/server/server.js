const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./controllers/router.js');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.set('Access-Control-Allow-Credentials', true);
//   res.set('Access-Control-Allow-Headers', 'Content-Type');
// 	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//   next();
// });

app.use('/api', router);

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = app;
