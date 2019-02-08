var data;
var arrData;

// scrapeNcaaNode.js grabs the data and stores it on my site
// this file takes the data I already put into data/index.html (my site) and pushes the data onto a webpage 
$.getJSON("data/index.html", function (data) {
    "use strict";
    window.data = data;
    window.arrData = Object.values(data.games);
    return data;
});


// It takes a bit for the $.getJSON() to finish, so I pause 500ms before trying to output the data
setTimeout(function listGames() {
    // var arrData = Object.values(data.games);
    "use strict";
    $('body').append(data.updated_at);
    console.log("starting listGames() function");
    for (var i=0; i < arrData.length; i++) {
        var awayTeam = data.games[i].game.away.names.short;
        var awayScore = data.games[i].game.away.score;
        var homeTeam = data.games[i].game.home.names.short;
        var homeScore = data.games[i].game.home.score;
        var gameState = data.games[i].game.gameState;
        var fullGameInfo = '<div class="game" id="game' + [i] + '">' + gameState + "<br> " + awayTeam + " " + awayScore + "<br> " + homeTeam + " " + homeScore + '</div>';
        $('body').append(fullGameInfo);
        // console.log(data.games[i].game.away.names.char6);
    }
}, 500);
