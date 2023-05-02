const regionM = require('../../shared/resources/db/mongodb/schemas.js').Agent;

const Joi = require('joi');

const regionCreate = async (req, res) => {
    const { region } = req.body;
  
    // Check if region already exists
    const existingRegion = await regionM.findOne({ region });
    if (existingRegion) {
      return res.status(400).json({ error: 'Region already exists' });
    }
  
    // Create region
    const agentsInRegion = await regionM.find({ region });
    const totalSales = agentsInRegion.reduce((acc, agent) => acc + agent.sales, 0);
    const topAgents = agentsInRegion.sort((a, b) => b.sales - a.sales).slice(0, 3);
    const manager = await createManager(region);
  
    const newRegion = new regionM({
      region,
      manager,
      top_agents: topAgents,
      total_sales: totalSales,
    });
  
    try {
      await newRegion.save();
      res.status(201).json(newRegion);
    } catch (error) {
      res.status(500).json({ error: 'Could not create region' });
    }
  };
  
  const createManager = async (region) => {
    const newAgent = new regionM({
      first_name: `${region} Manager`,
      last_name: 'Agent',
      email: `${region.toLowerCase()}-manager@example.com`,
      region: region,
      sales: 0
    });
  
    try {
      await newAgent.save();
      console.log(`Created manager agent for ${region}`);
    } catch (error) {
      console.error(error);
      throw new Error('Could not create manager');
    }
  
    return newAgent;
  };

const regionGet = async (req, res) => {
    const region = req.params.region
    const regions = await regionM.find({ region: region });
  
    res.send(regions);

}

const allStars = async (req, res) => {
    const regions = await regionM.find(); 
    const averages = {};
    for (let i = 0; i < regions.length; i++) {
        const region = regions[i].region;
        const sale = regions[i].sales;
        if (!averages[region]) {
            averages[region] = { total: 0, count: 0 };
        }
        averages[region].total += sale;
        averages[region].count++;
    }
    for (const region in averages) {
        averages[region].averageSale = averages[region].total / averages[region].count;
        delete averages[region].total;
        delete averages[region].count;
    }
    res.send(averages);

}

const createAgent = async (agentData) => {
    const agent = new regionM(agentData);
    await agent.save();
    return agent;
  };

module.exports = { regionCreate, regionGet, allStars };