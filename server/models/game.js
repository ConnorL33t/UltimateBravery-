var uuid = require('node-uuid')
const {Player} = require('./player')

class Game {
    constructor() {
        this.id = this.createId();
        this.summoners = [];
        this.redTeam = [];
        this.blueTeam = [];
        this.assignedChampions = [];

        this.full = false;
    }
    createId() {
        var id = uuid.v1({
            node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
            clockseq: 0x1234,
            msecs: new Date('2011-11-01').getTime(),
            nsecs: 5678
        });
        return id;
    }

    addSummoner() {
        var user = new Player();

        //  user.getPlayersChampions(); 
        if (this.redTeam.length < this.blueTeam.length || this.redTeam.length === 0) {
            this.redTeam.push(user);
            user.team = this.redTeam;
            this.summoners.length === 10 ? gameIsFull() : this.full = false;
        } else {
            this.blueTeam.push(user);
            user.team = this.blueTeam;
            this.summoners.length === 10 ? gameIsFull() : this.full = false;
        }
        return;

    }
    gameIsFull() {
        this.full = true;
        // randomizeRedTeam(this.summoners);
    }
    getPlayers() {
        return (this.redTeam, this.blueTeam);

    }
    getId() {
        return this.id
    }

}
module.exports = { Game }