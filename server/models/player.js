
class Player { 
// TODO:: 
    constructor ({id, name}) {
        this.id = id,
        this.name = name;
        this.team;
        this.champion;
        this.items;
        this.role;

    }
    getPlayersChampions () {
        socket.emit('requestChampions', (data) => {
            this.champions = data;
        })
    }
}