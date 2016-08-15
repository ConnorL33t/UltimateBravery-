function Room(id){ 
     this.id = id; 
     this.summoners = []
     this.status = "notfull"
}

Room.protoype.addPerson = function(summonerID){
    if(this.status === "notfull"){
        this.summoners.push(summonerID)
    }
}
module.exports = Room; 