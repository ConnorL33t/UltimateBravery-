const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    SummonerName: {
        type: String,
        required: true
    },
    SummonerID: {
        type: String,
        required: true
    },
    Champions: {
        type: [String],
        required: true
    }
});

const Player = mongoose.model('Player', PlayerSchema);


module.exports = {PlayerSchema, Player};