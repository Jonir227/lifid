module.exports = (app) => {

  const Novella = require('../models/novella');

  console.log('listening apis...');

  app.get('/api/novella', (req, res) => {
    Novella.find((err, books) => {
      if (err) return res.status(500).send({ err: 'database failure' });
      res.json(books);
    });
  });

  app.get('/api/novella/:novella_id', (req, res) => {
    res.end();
  });
};
