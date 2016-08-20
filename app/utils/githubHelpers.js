var axios = require('axios');

var id = 'f94518856ff6039b43da';
var sec = 'e64a6a97f3b4faa5feddac48c0ef0781306aa7e6';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

function gerRepos(username) {
    //fetch usernames repos
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
    //calculate all the start that the user has
    return repos.data.reduce(function(prev, current) {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    //get Repos, getTotalStars, return object with that data
    return gerRepos(player.login)
        .then(getTotalStars)
        .then(function(totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores(players) {
    //return an array, after doing some fancy algorithms to determine a winner
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
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
    },
    battle: function(players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function(err) {
                console.warn('Error while getPlayersInfo:', err);
            })
    }
};

module.exports = helpers;
