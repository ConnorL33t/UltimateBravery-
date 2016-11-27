class RoomContainer {
    constructor () {
        players = [];
        games = []
    }     
    addUserToGame(player){
        this.players[player.id] = id;  
        if(player) {
            for(i = 0; i < this.games.length; i++){
                var currentGame = this.games[i];
                if(currentGame.players.length === 10){
                    var newGame = new Game(); 
                    newGame.addSummoner(clientData);
                    return newGame; 
                } else {
                    currentGame.addSummoner(clientData);
                    return currentGame;
                }
            }

        }
        else {
            // to do
            socket.emit('Invalid Player', () => {})
        }
    }
}