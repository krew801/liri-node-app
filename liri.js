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