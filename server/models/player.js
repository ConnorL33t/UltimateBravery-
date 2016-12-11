
class Player { 
// TODO:: 
    constructor (id) {
        this.id = id;
        this.game;
        this.summonerName;
        this.selectedChampions;
        this.champion;
        this.items;
        this.role;
    }
    requestData(socket) {
        socket.emit('requestName')
        socket.emit('requestChamps')

        socket.on('champData', (data) => {
            this.setPlayersChampions(data);
        });
        socket.on('nameData', (data) => {
            this.setPlayersName(data);
        });
    }
    setPlayersName(data) {
        this.name = data.name;
    }
    setPlayersChampions(data) {
        this.selectedChampions = data.champions;
    }
}
module.exports = { Player }