const {Game} = require('./game') 

class RoomContainer {
    constructor () {
        this.games = [];

    }
    addUserToGame(id){
        // if(id) {
            if(this.games.length != 0){
            for(var i = 0; i < this.games.length; i++){
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

            } else {
                var newGame = new Game();
                this.games.push(newGame);
                newGame.addSummoner(id);
                return newGame;
            }
        //}
       // else {
        
      //  }
    }
}
module.exports = { RoomContainer }