const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');
const path = require('path');

exports.startServer = (port) => {
  const app = express();
  mongoose.connect(config.mongodbURL);
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
  });

  app.set('jwt-secret', config.secret);

  // set app to use body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // 로그를 출력하기 위함
  app.use(morgan('dev'));

  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  app.use('/api', require('./api'));
  app.use('/', express.static(path.join(__dirname, '../public/')));

  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  // });

  /* app.get('/api/today-novel/list', (req, res) => {
    res.send({ 'page:': req.query.page, 'quantity:': req.query.quantity });
  }); */

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });
};
