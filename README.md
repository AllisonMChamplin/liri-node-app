# LIRI - Language Interpretation and Recognition Interface
LIRI is a command line node app that takes in commands and logs and displays data.

### LIRI searches:
1. **Bands in Town** for concerts
2. **Spotify** for songs
3. **OMDB** for movies.

### LIRI supports the following four commands:

1. `concert-this`
    ```javascript 
    node liri.js concert-this <artist/band name here> 
    ```
    This will search the [Bands in Town Artist Events API](http://www.artists.bandsintown.com/bandsintown-api) for an artist.    
    

    The following information about each event is displayed in the terminal and logged to log.txt:
    * Name of the venue
    * Venue location
    * Date of the Event
        * The [Moment](https://www.npmjs.com/package/moment) package is used to format dates.

<br>
<img src="https://allisonmchamplin.github.io/assets/images/concert-this-02.gif" width="450" title="Video of the concert-this command">
<br>
<img src="https://allisonmchamplin.github.io/assets/images/concert-this-log.gif" width="450" title="Screenshot of the Log of the concert-this command">
<br><br>

2. `spotify-this-song`
    ```javascript 
    node liri.js spotify-this-song <song name here> 
    ```
    This will search the [Node Spotify API](https://www.npmjs.com/package/node-spotify-api) for an artist.

    The following information about the song is displayed in the terminal and logged to log.txt:

    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
    * *If no song is provided then the program will default to "The Sign" by Ace of Base.*

<br>
<img src="https://allisonmchamplin.github.io/assets/images/spotify-01.gif" width="450" title="Video of the spotify-this-song command">
<br>
<img src="https://allisonmchamplin.github.io/assets/images/spotify-02.gif" width="450" title="Screenshot of the Log of the spotify-this-song command">
<br><br>

3. `movie-this`
    ```javascript 
    node liri.js movie-this <movie name here> 
    ```
    This will search the [OMDb API](http://www.omdbapi.com/) for a movie.

    The following information about the movie is displayed in the terminal and logged to log.txt:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * *If no song is provided then the program will default to "Mr. Nobody."*

<br>
<img src="https://allisonmchamplin.github.io/assets/images/movie-01.gif" width="450" title="Video of the movie-this command">
<br>
<img src="https://allisonmchamplin.github.io/assets/images/movie-02.gif" width="450" title="Screenshot of the Log of the movie-this command">
<br><br>

4. `do-what-it-says`
    ```javascript 
    node liri.js do-what-it-says 
    ```
    * Using the [fs Node](https://www.npmjs.com/package/file-system) package, LIRI will take the text inside of random.txt and use it to call one of LIRI's commands.
    * It will run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    * Editing the text in random.txt will test out the feature for movie-this and concert-this.

<br>
<img src="https://allisonmchamplin.github.io/assets/images/do-what-01.gif" width="450" title="Video of the do-what-it-says command">
<br>
<img src="https://allisonmchamplin.github.io/assets/images/do-what-02.gif" width="450" title="Screenshot of the Log of the do-what-it-says command">
<br><br>

### Made with
* Node.js
* [Bands in Town Artist Events API](http://www.artists.bandsintown.com/bandsintown-api)
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)
* [OMDb API](http://www.omdbapi.com/)
* [fs Node](https://www.npmjs.com/package/file-system)
* [Axios](https://www.npmjs.com/package/axios)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Moment](https://www.npmjs.com/package/moment)