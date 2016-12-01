const {Game} = require('./game') 

class RoomContainer {
    constructor () {
        games = [new Game()]
    }     
    addUserToGame(id){
        if(id) {
            for(i = 0; i < this.games.length; i++){
                var currentGame = this.games[i];
                if(currentGame.players.length === 10){
                    var newGame = new Game(); 
                    games.push(newGame);
                    return newGame.addSummoner(id);
                    
                } else {
                    return currentGame.addSummoner(id);
                  
                }
            }

        }
        else {
        
        }
    }
    getRoomsPlayers(roomId)
    {
        var game = this.games.filter( (game) => game.id = roomId ); 
        return game.getPlayers(); 
    }
}