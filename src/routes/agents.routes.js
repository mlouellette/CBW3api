const AgentsController = require('../features/health/agent.controller');

const { isAuth } = require('../shared/resources/db/mongodb/authentication')

const registerAgentRoutes = (app) => {
  app.get('/agents', isAuth, AgentsController.agentsList);
  app.get('/agents-by-region/:region', isAuth, AgentsController.agentsRegion);
  app.put('/agent-update-info/:last_name', isAuth, AgentsController.agentsUpdate);
  app.post('/agent-create', isAuth, AgentsController.agentsPost);
    
}


module.exports = {registerAgentRoutes};