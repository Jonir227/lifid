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
  // 리퀘스트 길이가 길때를 위해서 제한을 50메가 늘림
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });
};
