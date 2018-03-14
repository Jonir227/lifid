const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

exports.startServer = (port) => {
  const app = express();
  // set app to use body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
  });

  mongoose.connect('mongodb://jonir:qjawns227@ds213239.mlab.com:13239/lifid');

  require('./api')(app);

  app.use('/', express.static('build/'));

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });
};
