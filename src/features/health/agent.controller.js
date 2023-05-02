const agentsM = require('../../shared/resources/db/mongodb/schemas.js').Agent;
const Joi = require('joi');


const agentsPost = async (req, res) => {
    const agents = new agentsM(req.body);
    

    try {
        await agents.save();
        res.send(agents);
    } catch (error) {
        res.status(500).send(error);

    }

};


const agentsList = async (req, res) => {
  const agents = await agentsM.find({});
  console.log(agents)
  const agentList = agents.map(agent => agent.last_name).sort();

  res.send(agentList);

};

const agentsRegion = async (req, res) => {
    const region = req.params.region;

    // Find if there's any :region of that name in the database, sends (404) if not.
    const regionFind = await agentsM.find({ region: region }).exec();
    if (regionFind.length === 0) return res.status(404).send("Region not found");

    // Returns the list of objects that contains :region 
    const regionList = regionFind.filter(c => c.region === req.params.region);
    const agentByRegion = regionList.map(c => c.last_name);

  
    res.send(agentByRegion);
  
};

const agentsUpdate = async (req, res) => {
    const agent = req.params.last_name;

    result = {}
    if (req.body.first_name) result.first_name = req.body.first_name;
    if (req.body.last_name) result.last_name = req.body.last_name;
    if (req.body.email) result.email = req.body.email;
    if (Object.keys(result).length === 0) return res.status(404).send("Cannot modify that data");

    const agentFind = await agentsM.findOneAndUpdate({ last_name: agent }, result, { new: true});
    if (!agentFind) return res.status(404).send("Agent not found");

    res.send(agentFind);

};


const deleteAgent = async(req, res) => {
    try {
        const agents = await agentsM.findByIdAndDelete(req.params.id);
      
        if (!agents) res.status(404).send("No item found");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
    
}

module.exports = { agentsList, agentsRegion, agentsUpdate, agentsPost, deleteAgent };