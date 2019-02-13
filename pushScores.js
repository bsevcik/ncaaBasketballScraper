var data;
var arrData;
var ncaaUrl;

// Found a way around CORS errors, so now I don't need to scrape the node file. Will leave it in here in case I want to switch back
// scrapeNcaaNode.js grabs the data and stores it on my site
// this script takes the data I already put into data/index.html (scraped by scrapeNcaaNode.js) and pushes the data onto a webpage 
//$.getJSON("data/index.html", function (data) {
//    "use strict";
//    window.data = data;
//    window.arrData = Object.values(data.games);
//    return data;
//});

//This automates the daily url update
// var ncaaUrl;
function retrieveScoreUrl() {
    "use strict";
    ncaaUrl = "https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/";
    //    add date in format 2019/02/06/scoreboard.json
    var today = new Date();
    var yyyy = today.getFullYear();
    var dd = today.getDate();
    if (dd < 10) {
        dd = "0" + dd;
    }
    var mm = today.getMonth() + 1;
    if (mm < 10) {
        mm = "0" + mm;
    }
    today = yyyy + "/" + mm + "/" + dd;
    ncaaUrl += today;
    ncaaUrl += "/scoreboard.json";
    return ncaaUrl;
}
retrieveScoreUrl();
// Bypassed CORS error, can get live score updates direct from NCAA using the script below
$.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(ncaaUrl) + '&callback=?',
    function (data) {
    "use strict";
    window.data = data.contents;
    window.arrData = Object.keys(data.contents.games).map((key) => [key, data.contents.games[key]]);
    console.log(arrData);    
    return data;
});

// It takes a bit for the $.getJSON() to finish, so I pause 800ms before trying to output the data
var listGames = setTimeout(function() {
    // var arrData = Object.values(data.games);
    "use strict";
    $('body').append(data.updated_at);
    console.log("starting listGames() function");
    for (var i=0; i < arrData.length; i++) {
        var gameStart = data.games[i].game.startTime;
        var gameState = data.games[i].game.gameState;
        var awayTeam = data.games[i].game.away.names.short;
        var awayScore = data.games[i].game.away.score;
        var homeTeam = data.games[i].game.home.names.short;
        var homeScore = data.games[i].game.home.score;
        var clock =  data.games[i].game.currentClock + " " + data.games[i].game.currentClock;
        var homeWinner = data.games[i].game.home.winner;        
        var awayWinner = data.games[i].game.home.winner;
        if (data.games[i].game.gameState == "pre") {
            var fullGameInfo = '<div class="game" id="game' + [i] + '">' + gameStart + "<br> " + awayTeam + '<div class="awayScore">' + awayScore + "</div><br> " + homeTeam + " " + homeScore + '</div>';
            $('body').append(fullGameInfo);
        }else {
            var fullGameInfo = '<div class="game" id="game' + [i] + '">' + clock + " " + "<br> " + awayTeam + " " + awayScore + "<br> " + homeTeam + " " + homeScore + '</div>';
            $('body').append(fullGameInfo);
            // console.log(data.games[i].game.away.names.char6);
        }
        if (homeWinner == true) {
            console.log("home winner");
        } else {
            console.log("");
        }
    }
}, 800);
listGames;