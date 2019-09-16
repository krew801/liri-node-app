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

    case "move-this":
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
    })
}

var spotify = new Spotify({
    id: <your spotify client id>,
  secret: <your spotify client secret>
            });

            spotify
              .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
                console.log(data);
      })
  .catch(function(err) {
                console.error('Error occurred: ' + err); 
  });