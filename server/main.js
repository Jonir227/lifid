const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');

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

  app.use('/api', require('./api'));
  app.use('/', express.static('build/'));

  app.get('/*', (req, res) => {
    res.sendfile(express.static('build'));
  });

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });
};
