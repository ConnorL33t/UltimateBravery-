const request = require('request');

var requestChampions = (apikey) => {
    let base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/?';
    let apikey = api; 
    // api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57
    let url = base + req.params.summonerName + apikey;
    firstRequest(url);

};
var firstRequest = (url) => {
    request(url, (err, response, body) => {
        res.send(body)
    })
};
var secondRequest = (champions) => {

}

module.exports = ({ requestChampions })