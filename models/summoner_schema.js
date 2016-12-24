const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SummonerSchema = new Schema({
    Champion: {
        type: String,
        default: ''
    },
    Items: new Schema({ any: {} }),
    Role: {
        type: String,
        default: ''
    }
});

const Summoner = mongoose.model('Summoner', SummonerSchema);


module.exports = {SummonerSchema, Summoner};