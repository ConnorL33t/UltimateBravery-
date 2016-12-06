const {Game} = require('./game') 

class RoomContainer {
    constructor () {
        this.games = [];

    }
    addUserToGame(id){
        if(id) {
            for(i = 0; i < this.games.length; i++){
                var currentGame = this.games[i];
                if(currentGame.players.length === 10){
                    var newGame = new Game(); 
                    games.push(newGame);
                    newGame.addSummoner(id);
                    return newGame;
                    
                } else {
                  currentGame.addSummoner(id);
                  return currentGame;
                }
            }

        }
        else {
        
        }
    }
}
module.exports = { RoomContainer };