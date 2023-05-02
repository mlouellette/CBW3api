// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;

const MongoManager = require('./src/shared/resources/db/mongodb/mongo-manager')

MongoManager.openMongoConnection();

// Import routes
const HealthRoutes = require('./src/routes/health.routes');
const AgentsRoutes = require('./src/routes/agents.routes');
const RegionRoutes = require('./src/routes/region.routes');

app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);
AgentsRoutes.registerAgentRoutes(app);
RegionRoutes.registerRegionRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})