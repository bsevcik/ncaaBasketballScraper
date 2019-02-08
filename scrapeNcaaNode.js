//install some npm modules before running this
//npm install website-scraper
//npm install del
//npm install node-schedule
const scrape = require('website-scraper');
const del = require('del');
var schedule = require('node-schedule');
var ncaaUrl;

// Wrapped the whole program in this scheduler that runs every minute until I stop it
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
var j = schedule.scheduleJob('*/1 * * * *', function(){
    //This automates the daily url update
    // var ncaaUrl;
    "use strict";
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

    //This sets the options for scraping, urls:["the url i want to grab"], directory: 'the path I want to save it'
    let options = {
        urls: [ncaaUrl],
            directory: './data',
        };

    // the scraper can only make a new folder, it can't overwrite a current folder. So I delete the file and folder every time. Not ideal, and I don't have a plan if it fails to get new data
    function deleteData() {
        del(['./data/**']).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    }
    deleteData();


    // The scrape npm module
    setTimeout(function scrapeNcaa() {
        scrape(options).then((result) => {
            console.log("Website succesfully downloaded");
        }).catch((err) => {
            console.log("An error ocurred", err);
        }
        );
    // console.log() it out when it runs
        var today = new Date();
        var yyyy = today.getFullYear();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var hh = today.getHours();
        var min = today.getMinutes();
        var ss = today.getSeconds();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (dd < 10) {
            dd = "0" + dd;
        }
        today = yyyy + "/" + mm + "/" + dd;
        ncaaUrl += today;
        today = yyyy + "/" + mm + "/" + dd + "/" + hh + ":" + min + ":" + ss;
        console.log("running scrapeNcaa " + today);
    }
    , 2000);

// The end of the scheduler is below
});