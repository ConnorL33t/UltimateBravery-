const {Game} = require('./game')

class RoomContainer {
    constructor() {
        this.games = [];
        this.users = []

    }
    addUserToGame(id) {
        // if(id) {

        if (this.games.length != 0) {
            for (var i = 0; i < this.games.length; i++) {
                var currentGame = this.games[i];
                if (currentGame.summoners.length % 10 === 0) {
                    var newGame = new Game();
                    this.games.push(newGame);
                    newGame.addSummoner(id);
                    this.assignRoom(id, newGame);
                    return newGame;

                } else {
                    currentGame.addSummoner(id);
                    this.assignRoom(id, currentGame);
                    return currentGame;
                }
            }

        } else {
            var newGame = new Game();
            this.games.push(newGame);
            newGame.addSummoner(id);
            this.assignRoom(id, newGame);
            return newGame;
        }

        //}
        // else {

        //  }
    }
    removeUser(id) {
        var user = this.getUser(id);
        var game = this.getUsersGame(user);
        
        game.removePlayer(id);
        var indexOf = this.users.indexOf(user);
        this.users.splice(indexOf, 1);
        return game.id;
    }
    assignRoom(id, game) {
        var user = {
            // game.getPlayer(id)
            id: id,
            gameId: game.getId()
        }
        this.users.push(user);

        return;
    }
    getUser(id) {
        return this.users.filter((user) => id === user.id)[0];
    }
    getUsersGame(user) {
        var usersGame = user.gameId
        return this.games.filter((game) => usersGame === game.id)[0];
    }
}
module.exports = { RoomContainer }