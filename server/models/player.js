
class Player { 
// TODO:: 
    constructor () {
        this.player = {
            id: 10
        }
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