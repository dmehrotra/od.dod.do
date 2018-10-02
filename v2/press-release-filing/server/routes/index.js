const ProjectController = require('../controllers').project;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'This is the department of defense 5pm filings api',
  }));

  app.post('/api/project', ProjectController.create);
  app.get('/api/connected/:uuid', ProjectController.connected)
  app.get('/api/search/:query', ProjectController.search);
};
