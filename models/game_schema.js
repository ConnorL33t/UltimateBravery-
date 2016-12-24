const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {TeamSchema} = require('./team_schema');
const {PlayerSchema} = require('./player_schema')

const GameSchema = new Schema({
    BlueTeam: {
        type: [TeamSchema],
    },
    RedTeam: {
        type: [TeamSchema], 
    },
    Full: {
        type: Boolean, 
        default: false 
    },
    Players: {
        type: [PlayerSchema],
    }
})

const Game = mongoose.model('Game', GameSchema);


module.exports = {GameSchema, Game};