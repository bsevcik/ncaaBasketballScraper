var data;
var arrData;
var ncaaUrl;
var updatedAt;

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

// Trying to set it to reload while any game is still live. Want to run it every 5 seconds
//setTimeout(function() {
//    for (var i = 0; i < arrData.length; i++) {
//        while (data.games[i].game.gameState == "live") {
//        console.log(data.games[i].game.gameState);
//    
//        } 
//}}, 700);

// It takes a bit for the $.getJSON() to finish, so I pause 800ms before trying to output the data
var listGames = setTimeout(function() {
    // var arrData = Object.values(data.games);
    "use strict";
    console.log("starting listGames() function");
    window.updatedAt = "<h1> Scores Updated at: <br>" + data.updated_at + " ET</h1>";
    // window.updatedAt = updatedAt.slice(0, updatedAt.length-3);
    $('body').append(updatedAt);
    for (var i=0; i < arrData.length; i++) {
        var gameStart = data.games[i].game.startTime;
        var gameState = data.games[i].game.gameState;
        var awayRank = data.games[i].game.away.rank;
        var awayTeam = data.games[i].game.away.names.short;
        var awayScore = data.games[i].game.away.score;
        var homeRank = data.games[i].game.home.rank;
        var homeTeam = data.games[i].game.home.names.short;
        var homeScore = data.games[i].game.home.score;
        var period = data.games[i].game.currentPeriod;
        var clock =  data.games[i].game.contestClock;
        var homeWinner = data.games[i].game.home.winner;
        var awayWinner = data.games[i].game.home.winner;
        if (gameState == "pre") {
            var fullGameInfo =
                '<div class="game" id="game' + [i] + '">' +
                    '<ul class="gameStatus">' +
                        '<li class="tipTime">' +
                            gameStart +
                        '</li>' +
                    '</ul>' +
                        '<ul><li><hr></li></ul>' +
                    '</ul>' +
                    '<ul class="homeTeam">' +
                        '<li class="homeRank">' +
                            homeRank +
                        '</li>' +
                        '<li class="homeTeamName">' +
                            homeTeam +
                        '</li>' +
                        '<li class="homeTeamScore">' +

                        '</li>' +
                    '</ul>' +
                    '<ul class="awayTeam">' +
                        '<li class="awayRank">' +
                            awayRank +
                        '</li>' +
                        '<li class="awayTeamName">' + awayTeam +
                        '</li>' +
                        '<li class="awayTeamScore">' +
                        '</li>' +
                    '</ul>' +
                '</div>';
            $('body').append(fullGameInfo);
        } else if (gameState == "live" && period != "HALF") { 
// Used for live games that aren't at halftime
            var fullGameInfo =
            '<div class="game" id="game' + [i] + '">' +
            '<ul class="gameStatus">' +
                '<li class="gameState">' +
                    period +
                '</li>' +
                '<li class="clock">' +
                    clock +
                '</li>' +
            '</ul>' +
                '<ul><li><hr></li></ul>' +
            '</ul>' +
            '<ul class="homeTeam">' +
                '<li class="homeRank">' +
                    homeRank +
                '</li>' +
                '<li class="homeTeamName">' +
                    homeTeam +
                '</li>' +
                '<li class="homeTeamScore">' +
                    homeScore +
                '</li>' +
            '</ul>' +
            '<ul class="awayTeam">' +
                '<li class="awayRank">' +
                    awayRank +
                '</li>' +
                '<li class="awayTeamName">' + awayTeam +
                '</li>' +
                '<li class="awayTeamScore">' + awayScore +
                '</li>' +
            '</ul>' +
        '</div>';
            $('body').append(fullGameInfo);
        } else if (gameState == "final") {
            // var fullGameInfo = '<div class="game" id="game' + [i] + '">' + gameState + " " + "<br> " + awayTeam + " " + awayScore + "<br> " + homeTeam + " " + homeScore + '</div>';
            var fullGameInfo =
            '<div class="game" id="game' + [i] + '">' +
            '<ul class="gameStatus">' +
                '<li class="gameState">' +
                    gameState.toUpperCase() +
                '</li>' +
            '</ul>' +
                '<ul><li><hr></li></ul>' +
            '</ul>' +
            '<ul class="homeTeam">' +
                '<li class="homeRank">' +
                    homeRank +
                '</li>' +
                '<li class="homeTeamName">' +
                    homeTeam +
                '</li>' +
                '<li class="homeTeamScore">' +
                    homeScore +
                '</li>' +
            '</ul>' +
            '<ul class="awayTeam">' +
                '<li class="awayRank">' +
                    awayRank +
                '</li>' +
                '<li class="awayTeamName">' + awayTeam +
                '</li>' +
                '<li class="awayTeamScore">' + awayScore +
                '</li>' +
            '</ul>' +
        '</div>';
            $('body').append(fullGameInfo);
        } else if (period == "HALF") {
// Indicates half time or full time, but not a final score
        //    var fullGameInfo = '<div class="game" id="game' + [i] + '">' + period + "<br> " + awayTeam + " " + awayScore + "<br> " + homeTeam + " " + homeScore + '</div>';
            var fullGameInfo =
            '<div class="game" id="game' + [i] + '">' +
                '<ul class="gameStatus">' +
                    '<li class="gameState">' +
                        period.toUpperCase() +
                    '</li>' +
                '</ul>' +
                    '<ul><li><hr></li></ul>' +
                '</ul>' +
                '<ul class="homeTeam">' +
                    '<li class="homeRank">' +
                        homeRank +
                    '</li>' +
                    '<li class="homeTeamName">' +
                        homeTeam +
                    '</li>' +
                    '<li class="homeTeamScore">' +
                        homeScore +
                    '</li>' +
                '</ul>' +
                '<ul class="awayTeam">' +
                    '<li class="awayRank">' +
                        awayRank +
                    '</li>' +
                    '<li class="awayTeamName">' + awayTeam +
                    '</li>' +
                    '<li class="awayTeamScore">' + awayScore +
                    '</li>' +
                '</ul>' +
            '</div>';
        $('body').append(fullGameInfo);
    } else {
        console.log(homeTeam);
    }
        if (homeWinner == true) {
            console.log("home winner");
        } else {
            console.log("");
        }
    }
}, 800);
listGames;

/*
//This is the template for game info with styling
            var fullGameInfo =
                '<div class="game" id="game' + [i] + '">' +
                    '<ul class="gameStatus">' +
                        '<li class="tipTime">' + 
                            gameStart + 
                        '</li>' +
                        '<li class="gameState">' + 
                            gameState.toUpperCase() + 
                        '</li>' +
                        '<li class="clock">' + 
                            clock + 
                        '</li>' +
                    '</ul>' +
                        '<ul><li><hr></li></ul>' +
                    '</ul>' +
                    '<ul class="homeTeam">' +
                        '<li class="homeRank">' +
                            homeRank +
                        '</li>' +
                        '<li class="homeTeamName">' + 
                            homeTeam +
                        '</li>' +
                        '<li class="homeTeamScore">' + 
                            homeScore +
                        '</li>' +
                    '</ul>' +
                    '<ul class="awayTeam">' +
                        '<li class="awayRank">' +
                            awayRank +
                        '</li>' +
                        '<li class="awayTeamName">' + awayTeam +
                        '</li>' +
                        '<li class="awayTeamScore">' + awayScore +
                        '</li>' +
                    '</ul>' +
                '</div>';
            $('body').append(fullGameInfo);
*/