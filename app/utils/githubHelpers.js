var axios = require('axios');

var id = '';
var sec = '';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username) {
    return axios.get('https://api/github.com/users/' + username + param)
}

var helpers = {
    getPlayersInfo: function(players) {
        // fetch some date form github
        return axios.all(players.map(function(username){
            return getUserInfo(username)
        }))
    }
};

module.exports = helpers;
