//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

//   * [DotEnv](https://www.npmjs.com/package/dotenv)
require("dotenv").config();
let keys = require("./keys.js");
let request = require("request");
//   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
let Spotify = require('node-spotify-api');
//* You should then be able to access your keys information like so
let spotify = new Spotify(keys.spotify);
let fs = require("fs");

//   * [Moment](https://www.npmjs.com/package/moment)
let moment = require("moment");
let axios = require("axios");
let userInput = process.argv;
let action = userInput[2];
let songInputs = userInput[3];
let inputs = process.argv.slice(3);

//Commands used for different searches
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
switch (action) {
    //Set's up a function to read the Random.txt file
    case "do-what-it-says":
        letsReadThatFile(inputs);
        break;
    //`node liri.js movie-this '<movie name here>'`
    case "movie-this":
        movie(inputs);
        break;
    //`node liri.js spotify-this-song '<song name here>'
    // * Artist(s)
    // * The song's name
    // * A preview link of the song from Spotify
    // * The album that the song is from
    case "spotify-this-song":
        spotifySearch(inputs);
        break;
    //1. `node liri.js concert-this <artist/band name here>`
    // * Name of the venue
    // * Venue location
    // * Date of the Event (use moment to format this as "MM/DD/YYYY")
    case "concert-this":
        concertChecker(inputs);
        break;
}
// function letsReadThatFile(inputs) {
//     fs.readFile("random.txt", "utf-8");
// }
function movie(inputs) {
    //This posts the commands entered by the user into the log.txt file
    fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + inputs + '\n\n', (err) => {
		if (err) throw err;
	});//Takes the input entered by the user and pushes it into the quesryURL
    let queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        const results = JSON.parse(body);
        //This is checking to see if there is or is not an error.
        if (!error) {
            console.log("Title: " + results.Title + "\n------------------------------------" +
                "\nYear: " + results.Year + "\n------------------------------------" +
                "\nIMDB Rating: " + results.imdbRating + "\n------------------------------------" +
                "\nRotten Tomatoes Rating: " + results.Ratings[1].Value + "\n------------------------------------" +
                "\nCountry: " + results.Country +
                "\nLanguage: " + results.Language + "\n------------------------------------" +
                "\nPlot: " + results.Plot + "\n------------------------------------" +
                "\nActors: " + results.Actors);
        } else if (!inputs || TypeError) {
            inputs("Mr Nobody");
            console.log("Well that didn't work! Let's try again.");
        }
    });
}
function concertChecker(songInputs) {
    fs.appendFile('./log.txt', 'User Command: node liri.js concert-this ' + inputs + '\n\n', (err) => {
		if (err) throw err;
	});
    let queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, responses, body) {
        let result = JSON.parse(body)[0];
        if (!error) {
            console.log("City: " + result.City + "\n------------------------------------"
                + "\nVenue Name: " + result.Venue + "\n------------------------------------"
                + "\nDate of Event: " + moment(result.DateTime).format("MM/DD/YYYY")
                + "\n------------------------------------");
        }
        if (!inputs) {
            console.log("Try a different input command!");
            inputs = "The Wiggles";
        }
  
    });
}
function spotifySearch(inputs) {
    fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song' + inputs + '\n\n', (err) => {
        if(err) throw err;
    });
    let spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    if (!inputs) {
        console.log("Oops, that didn't work! Try again!");
        inputs = "Hit Me Baby One More Time";
    }
    spotify.search({
        type: "track",
        query: inputs,
    },
        function (err, data) {
            if (err) {
                console.log("OH Snap!! An unwanted guest has stopped by. That means: " + err);
                return;
            }
            let songDetails = data.tracks.items;
            console.log("Here is the Artist: " + songDetails[0].artists[0].name + "\n----------------------------" + "\nWhat is the name of the song you say? Well it's: " + songDetails[0].name +
                "\n----------------------------" + "\nCheck out this sweet sweet link: " + songDetails[0].preview_url +
                "\n----------------------------" + "\nIt's part of this album: " + songDetails[0].album.name);
        });
}
