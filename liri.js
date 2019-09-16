require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

var input = process.argv;
var action = input[2];
var inputs = input[3];

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
    var queryUrl =
        "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        var results = JSON.parse(body);

        if (!error && response.statusCode === 200) {
            console.log("Title: " + results.Title);
            console.log("Release Year: " + results.Year);
            console.log("IMDB Rating: " + results.imdbRating);
            console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
            console.log("Country: " + results.Country);
            console.log("Language: " + results.Language);
            console.log("Plot: " + results.Plot);
            console.log("Actors: " + results.Actors);
        }
    });
}
function concert(inputs) {
    var queryUrl = "http://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body){
        if(!inputs){
            alert("Try a different input command!")
        }

        var result = JSON.parse(body)[0];
        if (!error){
            console.log("City: " + result.venue.city + "\nVenue Name: " + result.venue.name + "\nDate of Event: " + moment(result.datetime).format("MM/DD/YYY") + 
            "\nVenue Name: " + result.venue.name);
        }
    });
}
function doIt(inputs){
    fs.readFile("random.txt", "utf-8", function(err,bur){
        console.log(buf.toString());
    });
}
function spotify(inputs){
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    if(!inputs){
        console.log("Oops, that didn't work! Try again!");
        inputs = "Hit Me Baby One More Time";
    }
}
