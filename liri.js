require("dotenv").config();
let keys = require("./keys.js");
let request = require("request");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let fs = require("fs");
let moment = require("moment");
let axios = require("axios");
let input = process.argv;
let action = input[2];
let inputs = input[3];

switch (action) {
    case "spotify-this-song":
        spotifyThis(inputs);
        break;
    case "movie-this":
        movie(inputs);
        break;
    case "concert-this":
        concert(inputs);
        break;
    case "do-what-it-says":
        letsReadThatFile(inputs);
        break;
}
function letsReadThatFile(inputs){
    fs.readFile("random.txt", "utf-8");

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
function concert(input) {
    let queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body){
        if(!input){
            console.log("Try a different input command!");
            inputs = "The Wiggles";
        }

        let result = JSON.parse(body)[0];
        if (!error){
            console.log("City: " + result.venue.city + "\n------------------------------------" + "\nVenue Name: " + result.venue.name + "\n------------------------------------" +
             "\nDate of Event: " + moment(result.datetime).format("MM/DD/YYYY")+ "\n------------------------------------");
        }
        else{
            return false;
        }
    });
}
function spotifyThis(inputs){
    let spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    if(!inputs){
        console.log("Oops, that didn't work! Try again!");
        inputs = "Hit Me Baby One More Time";
    }
    spotify.search({
        type: "track",
        query: inputs,
    },
    function(err,data){
        if(err){
            console.log("OH Snap!! An unwanted guest has stopped by. That means: " + err);
            return;
        }
       let songDetails = data.tracks.items;
       console.log("Here is the Artist: " + songDetails[0].artists[0].name + "\n----------------------------" + "\nWhat is the name of the song you say? Well it's: " + songDetails[0].name + 
       "\n----------------------------" + "\nCheck out this sweet sweet link: " + songDetails[0].preview_url + 
       "\n----------------------------" + "\nIt's part of this album: " + songDetails[0].album.name); 
    });
}
