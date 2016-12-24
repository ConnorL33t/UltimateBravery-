const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {SummonerSchema} = require('./summoner_schema')

const TeamSchema = new Schema({
    Summoners: {
        type: [SummonerSchema],
        default: []
    },
    Full: {
        type: Boolean, 
        default: false 
    }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = {TeamSchema, Team};