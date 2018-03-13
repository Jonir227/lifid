module.exports = (app) => {
  app.get('/api/novella', (req, res) => {
    res.end();
  });

  app.get('/api/novella/:novella_id', (req, res) => {
    res.end();
  });
};
