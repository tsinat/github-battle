var axios = require('axios');

var id = 'f94518856ff6039b43da';
var sec = 'e64a6a97f3b4faa5feddac48c0ef0781306aa7e6';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

var helpers = {
    getPlayersInfo: function(players) {
        // fetch some date form github
        return axios.all(players.map(function(username){
            return getUserInfo(username)
        })).then(function(info) {
            console.log(info);
            return info.map(function(user) {
                return user.data;
            })
        })
    }
};

module.exports = helpers;
