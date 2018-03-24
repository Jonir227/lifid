const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');

exports.startServer = (port) => {
  const app = express();
  // set app to use body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // 로그를 출력하기 위함
  app.use(morgan('dev'));

  app.set('jwt-secret', config.secret);

  app.use('/', express.static('build/'));

  app.use('/api', require('./api'));

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });

  mongoose.connect(config.mongodbURL);
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
  });
};
