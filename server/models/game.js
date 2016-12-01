const {Player} = require('./player')
class Game {
    constructor () {
        id; // uuid 
        summoners = [];
        redTeam = [{
            assignedRoles,
            // summoners will be assigned when be assigned when randomization  is done. 
            summoners
        }];
        blueTeam = [{
            assignedRoles,
            summoners
        }];
        assignedChampions = [];
        
        full = false; 
    }

    addSummoner () {
       var user = this.summoners[id]
       user = new Player();
       user.getPlayersChampions(); 
       var summoner = this.summoners[clientData.id]
       summoner.getPlayersChampions();
       if(this.redTeam.length < this.blueTeam.length){
           this.redTeam.push(summoner.id);
           summoner.team = this.redTeam; 
           this.summoners.length === 10 ? gameIsFull() : this.full = false;
       } else {
           this.blueTeam.push(summoner.id);
           summoner.team = this.blueTeam;
           this.summoners.length ===  10 ? gameIsFull() : this.full = false; 
       }
       return this.id 
       
    }
    gameIsFull () {
       this.full = true; 
       randomizeRedTeam(this.summoners);
    }
    getPlayers () {
        return this.summoners 
    }

        
}