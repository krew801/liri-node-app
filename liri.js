require("dotenv").config();
let keys = require("./keys.js");
let request = require("request");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let fs = require("fs");
let moment = require("moment");

let input = process.argv;
let action = input[2];
let inputs = input[3];

switch (action) {
    case "spotify-this-song":
        spotify(inputs);
        break;
    case "movie-this":
        movie(inputs);
        break;
    case "concert-this":
        concert(inputs);
        break;
    case "do-what-it-says":
        doIt(inputs);
        break;
}
function movie(inputs) {
    let queryUrl =
        "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        let results = JSON.parse(body);

        if (!error) {
            console.log("Title: " + results.Title + "\nRelease Year: " + results.Year + "\nIMDB Rating: " + results.imdbRating + "\nRotten Tomatoes Rating: " + results.Ratings[1].Value + "\nCountry: " + results.Country + 
            "\nLanguage: " + results.Language + "\nPlot: " + results.Plot + "\nActors: " + results.Actors);
        }
    });
}
function concert(inputs) {
    let queryUrl = "http://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body){
        if(!inputs){
            alert("Try a different input command!")
        }

        let result = JSON.parse(body)[0];
        if (!error){
            console.log("City: " + result.venue.city + "\nVenue Name: " + result.venue.name + "\nDate of Event: " + moment(result.datetime).format("MM/DD/YYY") + 
            "\nVenue Name: " + result.venue.name);
        }
    });
}
function doIt(inputs){
    fs.readFile("random.txt", "utf-8", function(err,buf){
        console.log(buf.toString());
    });
}
function spotify(inputs){
    let spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    if(!inputs){
        console.log("Oops, that didn't work! Try again!");
        inputs = "Hit Me Baby One More Time";
    }
}
