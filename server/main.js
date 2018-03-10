const express = require('express');

exports.startServer = (port) => {
  const app = express();
  app.use('/', express.static('build/'));

  app.get('/hello', (req, res) =>
    (res.send('can you hear me?')));

  app.listen(port, () => {
    console.log('Express listening on port', port);
  });
};
