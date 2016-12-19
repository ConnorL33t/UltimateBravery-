const {Game} = require('./game')
const {randomize} = require('../utils/randomize');

class RoomContainer {
    constructor() {
        this.games = [];
        this.users = []

    }
    addUserToGame(id) {
        if (this.games.length != 0) {
            var openGame = this.games.filter((game) => game.summoners.length <= 10)[0];
            if (openGame) {
                openGame.addSummoner(id);
                return this.assignRoom(id, openGame);
            } else {
                var newGame = new Game();
                this.games.push(newGame);
                newGame.addSummoner(id);
                return this.assignRoom(id, newGame);
              }
        } else {
            var newGame = new Game();
            this.games.push(newGame);
            newGame.addSummoner(id);
            return this.assignRoom(id, newGame);  
        }
    }
    removeUser(id) {
        var user = this.getUser(id);
        var game = this.getUsersGame(user);
        if(user || game){
        game.removePlayer(id);
        var indexOf = this.users.indexOf(user);
        this.users.splice(indexOf, 1);
        return game.id;
        } else { 
          return;
        }
    }
    assignRoom(id, game) {
        var user = {
            id: id,
            gameId: game.getId()
        }
        this.users.push(user);
        return game;
    }
    getUser(id) {
        return this.users.filter((user) => id === user.id)[0];
    }
    getUsersGame(user) {
        if(user){
        var usersGame = user.gameId
        return this.games.filter((game) => usersGame === game.id)[0];
        }
    }
    randomizeGame (game) {
        if(game.full === true){
        randomize(game)
        }
        else{
        
        }
    }
}
module.exports = { RoomContainer }