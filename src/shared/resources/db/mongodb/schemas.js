const mongoose = require('mongoose')

const agentsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    rating:{
        type: String

    },
    fee:{
        type: String
   
    },
    sales:{
        type: String,
        default: 0
    }
})

const Agent = mongoose.model("Agent", agentsSchema);

const RegionSchema = new mongoose.Schema({
    region: {
        type: String,
        lowercase: true,
    },
    address: {
        type: String,
        lowercase: true,
    },
    total_sales: {
        type: Number,
    },
    manager: {
        type: String,
        lowercase: true,
    },
    top_agents: {
        type: String,
        lowercase: true,
    },
})

const Region = mongoose.model("Region", RegionSchema);

module.exports = 
{
    Agent,
    Region
};