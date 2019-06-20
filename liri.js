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
var input = process.argv.slice(3).join(" ");

var myFunction = function (command, input, option) {
    var divider = "\n------------------------------------------------------------\n";
    if (command && option === false) {
        // console.log("option: ****", option);
        fs.appendFile("log.txt", "\n\n" + divider + "COMMAND LOGGED: " + command.toUpperCase() + " " + input, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }

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
                var results = response.data;
                
                var rottonString = "";
                if (results.Ratings[1]) {
                    rottonString = "Rotten Tomatoes Rating: " + results.Ratings[1].Value;
                }
                // console.log("RottonString: ", rottonString);

                var movieData = ["\n", 
                "Title: " + results.Title,
                "\n", 
                "Release Year: " + results.Year,
                "\n", 
                "IMDB Rating: " + results.Ratings[0].Value,
                "\n", 
                rottonString,
                "\n", 
                "Country: " + results.Country,
                "\n", 
                "Language: " + results.Language,
                "\n", 
                "Plot: " + results.Plot,
              ].join(" ");


                fs.appendFile("log.txt", movieData + divider, function (err) {
                    if (err) throw err;
                  });        
                  console.log(movieData);


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
            var myInput = dataArr.slice(1).join(" ");
            // console.log("command: ", myCommand);
            // console.log("myInput: ", myInput);
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
                    if (response.data.length > 1) {
                    console.log("There are " + response.data.length + " events:");
                    } else if (response.data.length === 1) {
                    console.log("There is " + response.data.length + " event:");
                    }
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
                return console.log('*Error occurred: ' + err);
            }
            var results = data.tracks.items[0];
            console.log("results: ", results.name);
            var spotifyData = ["\n", 
                "SONG: " + results.name,
                "\n",
                "ARTIST: ", results.artists[0].name,
                "\n",
                "PREVIEW: ", results.preview_url,
                "\n",
                "ALBUM: ", results.album.name,                
              ].join(" ");

              fs.appendFile("log.txt", spotifyData + divider, function (err) {
                if (err) throw err;
              });        
              console.log("SpotifyData: ", spotifyData);


        });

    } else {
        console.log("Invalid command");
    };

}

myFunction(command, input, false);

