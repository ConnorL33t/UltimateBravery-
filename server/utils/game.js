class Game {
    constructor () {
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

    addSummoner (clientData) {
       
       this.summoner[clientData.id] = new Player(clientData); 
       var summoner = this.summoners[clientData.id]
       if(this.redTeam.length < this.blueTeam.length){
           this.redTeam.push(summoner.id);
           this.summoners.length === 10 ? gameIsFull() : this.full = false;
       } else {
           this.blueTeam.push(summoner.id);
           this.summoners.length ===  10 ? gameIsFull() : this.full = false; 
       }
       summoner.getPlayersChampions();
       
    }
    gameIsFull(){
       this.full = true; 
       this.summoners.forEach((summoner) => {
          var team = summoner.getTeam();
          var role = summoner.getRole(team);
          var items = summoner.getItems(role);
          var champion = summoner.getRandomChampion(assignedChampions);
       }); 
        

    }
}