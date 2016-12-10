
class Player { 
// TODO:: 
    constructor (id) {
        this.player = {
            id: id
        }
        this.game;
        //this.name = name;
        //this.team;
        //this.champion;
        //this.items;
        //this.role;

    }
    getPlayersChampions () {
        socket.emit('requestChampions', (data) => {
            this.champions = data;
        })
    }
}
module.exports = { Player }