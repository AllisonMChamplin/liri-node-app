// Core node package for reading and writing files
var fs = require("fs");
// Spotify package
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// Axios package
var axios = require("axios");
// Moment package
var moment = require('moment');

var nodeArgs = process.argv;
var command = nodeArgs[2];
// Get additional user input
var input = nodeArgs.slice(3);

var myFunction = function (command, input, option) {

    // console.log("input: ", input);
    var x = input.toString();
    // var x = JSON.stringify(input);
    var newStr = x.replace(/,/g, ' ');
    // console.log("newStr: ", newStr);
    // We will add the value to the log file.
    fs.appendFile("log.txt", "\n\n" + "USER TYPED COMMAND: " + command.toUpperCase() + " " + newStr, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    if (command === "movie-this") {
        // Create a variable for holding the movie name
        var movieName = input;

        if (input === undefined || input.length == 0) {
            movieName = "mr+nobody";
            // Then run a request with axios to the OMDB API with the movie Mr. Nobody
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        } else {
            // Then run a request with axios to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        }

        // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);

        axios.get(queryUrl).then(
            function (response) {
                console.log("\n");
                console.log("* * * * * * MOVIE RESULTS * * * * * *");
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                if (response.data.Ratings[1]) {
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                }
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("\n");




                // console.log("input: ", input);
                var x = input.toString();
                // var x = JSON.stringify(input);
                var newStr = x.replace(/,/g, ' ');
                // console.log("newStr: ", newStr);
                // We will add the value to the log file.
                var rottonString = "";
                if (response.data.Ratings[1]) {
                    rottonString = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
                }
                // console.log("RottonString: ", rottonString);

                fs.appendFile("log.txt",
                    "\n" + "* * * * * * MOVIE RESULTS * * * * * *" +
                    "\n" + "Title: " + response.data.Title +
                    "\n" + "Release Year: " + response.data.Year +
                    "\n" + "IMDB Rating: " + response.data.Ratings[0].Value +
                    "\n" + rottonString +
                    "\n" + "Country: " + response.data.Country +
                    "\n" + "Language: " + response.data.Language +
                    "\n" + "Plot: " + response.data.Plot +
                    "\n" + "Actors: " + response.data.Actors + "\n", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });






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

    } else if (command === "do-what-it-says") {

        fs.readFile("random.txt", "utf8", function (error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            var myCommand = dataArr[0];
            var myInput = dataArr[1];
            myFunction(myCommand, myInput, true);
        });

    } else if (command === "concert-this") {
        // Create a variable for holding the band name
        var artist = input;
        // console.log("Artist: ****", artist);
        if (input === undefined || input.length == 0) {
            console.log("You didn't enter a band name.");
            fs.appendFile("log.txt", "You didn't enter a band name.", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            return;
        } else {
            // console.log("hi?");
            // Then run a request with axios to the OMDB API with the movie specified
            var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        }

        axios.get(queryUrl).then(
            function (response) {
                if (!response.data.length > 0) {
                    console.log("No upcoming events");
                    fs.appendFile("log.txt", "No upcoming events.", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                } else {
                    console.log("\n");
                    console.log("There are " + response.data.length + " events:");
                    for (i = 0; i < response.data.length; i++) {
                        console.log("* * * * * * Event " + (i + 1) + " * * * * * *");
                        console.log("ARTIST: ", response.data[i].lineup[0]);
                        console.log("VENUE: ", response.data[i].venue.name);
                        console.log("LOCATION: ", response.data[i].venue.city + ', ' + response.data[i].venue.country);
                        var date = response.data[i].datetime;
                        console.log("DATE OF EVENT: ", moment(date).format('MMMM Do YYYY, h:mm a'));
                        console.log("\n");
                    }


                    fs.appendFile("log.txt",
                        "\n" + "There are " + response.data.length + " events:", function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });


                    for (i = 0; i < response.data.length; i++) {
                        fs.appendFile("log.txt",
                            "\n" + "* * * * * * Event " + (i + 1) + " * * * * * *" +
                            "\n" + "ARTIST: " + response.data[i].lineup[0] +
                            "\n" + "VENUE: " + response.data[i].venue.name +
                            "\n" + "LOCATION: " + response.data[i].venue.city +
                            "\n" + "DATE OF EVENT: " + moment(date).format('MMMM Do YYYY, h:mm a') +
                            "\n", function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                    }
                }
            }
        )
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

    } else if (command === "spotify-this-song") {

        if (input === undefined || input.length == 0) {
            songName = "Ace of Base";
        } else {
            songName = input;
        }

        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var results = data.tracks.items[0];
            console.log("\n");
            console.log("* * * * * * SPOTIFY RESULTS * * * * * *");
            if (results.name) {
                console.log("SONG: ", results.name);
            };
            if (results.artists[0].name) {
                console.log("ARTIST: ", results.artists[0].name);
            };
            if (results.preview_url) {
                console.log("PREVIEW: ", results.preview_url);
            } else {
                console.log("NO PREVIEW AVAILABLE");
            };
            if (results.album.name) {
                console.log("ALBUM: ", results.album.name);
            };
            console.log("\n");

            fs.appendFile("log.txt", 
            "\n" + "* * * * * * SPOTIFY RESULTS * * * * * *" +
            "\n" + "ARTIST: ", results.artists[0].name +
            "\n" + "PREVIEW: ", results.preview_url +
            "\n" + "ALBUM: ", results.album.name +
            "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
            });


        });

    } else {
        console.log("Invalid command");
    };

}

myFunction(command, input, false);

