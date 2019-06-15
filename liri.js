// Core node package for reading and writing files
// var fs = require("fs");

// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// process.argv will print out any command line arguments.
// console.log(process.argv);


// Axios package
var axios = require("axios");

// Store all of the arguments in an array
var nodeArgs = process.argv;
console.log("nodeArgs: " + nodeArgs);
// Extract Valid Command from arguments
var command = nodeArgs[2];
console.log("command: " + command);
var input = nodeArgs.slice(3);
console.log("input: " + input);

if (command === "movie") {
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

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
} else {
    console.log("not movie");
}
