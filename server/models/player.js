
class Player { 
// TODO:: 
    constructor ({id, name}) {
        this.id = id,
        this.name = name;
        team; 
        champion;
        items; 
        role; 

    }
    getPlayersChampions () {
        socket.emit('requestChampions', (data) => {
            this.champions = data;
        })
    }
}