const mongoose = require('mongoose');
const {GameSchema} = require('./game_schema');
const Schema = mongoose.Schema;

const GameContainerSchema = new Schema({    
    Games: {
        type: [GameSchema]
    }   
});

const GameContainer = mongoose.model('GameContainer', GameContainerSchema);

module.exports = GameContainer;