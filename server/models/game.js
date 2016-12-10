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
        var id = uuid.v4();
        return id;
    }

    addSummoner(id) {
        var user = new Player(id);
        this.summoners.push(user)
        //  user.getPlayersChampions(); 
        if (this.redTeam.length < this.blueTeam.length || this.redTeam.length === 0) {
            this.redTeam.push(user.player.id);
            user.team = this.redTeam;
            this.summoners.length === 10 ? this.gameIsFull() : this.full = false;
        } else {
            this.blueTeam.push(user.player.id);
            user.team = this.blueTeam;
            this.summoners.length === 10 ? this.gameIsFull() : this.full = false;
        }
        return;

    }
    removePlayer(id) {
        var player = this.getPlayer(id)
        // delete user from summoners 
        var deleteFromSummoner = this.summoners.filter((summoner) => summoner.player.id === id)[0];
        var summonersIndex = this.summoners.indexOf(deleteFromSummoner);
        this.summoners.splice(summonersIndex, 1);
        // delete user from team
        var user = player.team.filter((summoner) => summoner === id)[0];
        var indexOf = player.team.indexOf(user);
        player.team.splice(indexOf, 1);
        // delete assigned champ
        
        // set flag to false 
        this.full = false;
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
    getPlayer(id) {
        return this.summoners.filter((summoner) => summoner.player.id === id)[0];
    }

}
module.exports = { Game }