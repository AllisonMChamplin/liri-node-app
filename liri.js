// Core node package for reading and writing files
var fs = require("fs");

// Spotify package
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Axios package
var axios = require("axios");

// Moment
var moment = require('moment');

// Store all of the arguments in an array
var nodeArgs = process.argv;
// Extract Valid Command from arguments
var command = nodeArgs[2];
// Get additional user input
var input = nodeArgs.slice(3);
console.log("-----------------");
console.log("Command: " + command);
console.log("Input: " + input);
console.log("-----------------");


if (command === "movie-this") {
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And include "+"s
    for (var i = 0; i < input.length; i++) {
        if (i < input.length) {
            movieName = movieName + "+" + input[i];
        } else {
            movieName += input[i];
        }
    }

    if (movieName === "") {
        movieName = "mr+nobody";
        // Then run a request with axios to the OMDB API with the movie Mr. Nobody
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    } else {
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    }

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

} else if (command === "concert-this") {
    // console.log("concert stuff here");
    // Create an empty variable for holding the band name
    var artist = "";
    // Loop through all the words in the node argument
    // And include "+"s
    for (var i = 0; i < input.length; i++) {
        if (i < input.length) {
            artist = artist + input[i];
        }
    }

    if (artist === "") {
        console.log("You didn't enter a band name.");
    } else {
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    }

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            if (!response.data.length > 0) {
                console.log("No upcoming events");
            } else {
                console.log("There are " + response.data.length + " events:");
            for (i = 0; i < response.data.length; i++) {
                console.log("* * * * * * Event " + (i + 1) + " * * * * * *");
                // console.log("\n");
                console.log("ARTIST: ", response.data[i].lineup[0]);
                console.log("VENUE: ", response.data[i].venue.name);
                console.log("LOCATION: ", response.data[i].venue.city + ', ' + response.data[i].venue.country);
                var date = response.data[i].datetime;
                console.log("DATE OF EVENT: ", moment(date).format('MMMM Do YYYY, h:mm a'));
                console.log("\n");
                // console.log("* * * * * * * * * * * * * * * * * * * * * * *");
            }
        }
        })
        .catch (function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });





} else if (command === "spotify-this-song") {
    // console.log("spot");
    // Create an empty variable for holding the song name
    var songName = "";
    // Loop through all the words in the node argument
    // And include "+"s
    for (var i = 0; i < input.length; i++) {
        if (i < input.length) {
            songName = songName + " " + input[i];
        } else {
            songName += input[i];
        }
    }
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data);
        var results = data.tracks.items[0];
        // console.log(results);
        console.log("* * * * * * SPOTIFY RESULTS * * * * * *");
        console.log("\n");
        if (results.name) {
            console.log("SONG: ", results.name);
        };
        if (results.artists[0].name) {
            console.log("ARTIST(S): ", results.artists[0].name);
        };
        if (results.preview_url) {
            console.log("SONG: ", results.preview_url);
        } else {
            console.log("NO PREVIEW AVAILABLE");
        };
        if (results.album.name) {
            console.log("SONG: ", results.album.name);
        };
        console.log("\n");
        console.log("* * * * * * * * * * * * * * * * * * * * * * *");
    });

} else {
    console.log("Invalid command");
};


