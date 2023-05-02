const regionController = require('../features/health/region.controller');

const { isAuth } = require('../shared/resources/db/mongodb/authentication')

const registerRegionRoutes = (app) => {
  app.get('/region/:region', regionController.regionGet);
  app.post('/region-create', isAuth, regionController.regionCreate);
  app.get('/all-stars',  regionController.allStars);  

}

module.exports = { registerRegionRoutes };