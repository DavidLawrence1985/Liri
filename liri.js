require("dotenv").config();
var fs = require("fs");
var key = require("./key.js");
var moment = require("moment")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(key.spotify);
var axios = require("axios");

// https://rest.bandsintown.com/artists/circa%20survive/events?app_id=codingbootcamp ===bandsintown


var action = process.argv[2]
var request = process.argv.slice(3).join(" ");
var results;
var dataArr;

switch (action) {
    case "movie-this":
      movie(request);
      break;
    
      case "concert-this":
      concert(request);
      break;

      case "spotify-this-song":
      song(request);
      break;

      case "do-what-it-says":
      doWhat();
      break;
    
}

function movie(request){
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
        if(request){

            var movieTitle = "\r\nMovie Title: " + response.data.Title;
            var yearReleased = "\r\nYear released: " + response.data.Year;
            var rated = "\r\nRated: " + response.data.Rated;
            var rottenTom = "\r\nRotten Tomatoes rating: " + response.data.Ratings[1].Value;
            var country = "\r\nCountry of production: " + response.data.Country;
            var language = "\r\nLanguage: " + response.data.Language;
            var plot = "\r\nPlot: " + response.data.Plot;
            var cast = "\r\nCast: " +  response.data.Actors;

            fs.appendFile("log.txt", "\r\n***************concert-this****************** : " + request + "\r\n" + movieTitle + 
                yearReleased + rated + rottenTom + country + language + plot + cast + "\r\n", function(err) {


                if (err) {
                console.log(err);
                }
                else {
                // console.log("Content Added!");
                }
            })
            

            console.log(movieTitle);
            console.log(yearReleased);
            console.log(rated);
            console.log(rottenTom);
            console.log(country);
            console.log(language);
            console.log(plot);
            console.log(cast);

         
    }
    else {
        console.log("No movie requested...\r\nSample")  
        axios.get("http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("\r\nMovie Title: " + response.data.Title);
            console.log("\r\nYear released: " + response.data.Year);
            console.log("\r\nRated: " + response.data.Rated);
            console.log("\r\nRotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("\r\nCountry of production: " + response.data.Country);
            console.log("\r\nLanguage: " + response.data.Language);
            console.log("\r\nPlot: " + response.data.Plot);
            console.log("\r\nCast: " +  response.data.Actors);
        })
    
    }
    }
    )}

function concert(request){
    
    axios.get("https://rest.bandsintown.com/artists/" + request +"/events?app_id=codingbootcamp ").then(
        function(response){
             
            results = response.data;     
            if(results){
                fs.appendFile("log.txt", "\r\n***************concert-this******************* : " + request , function(err) {

                    if (err) {
                    console.log(err);
                    }
                    else {
                    // console.log("Content Added!");
                    }
                })

                for(var i = 0; i < results.length; i++){
                    var line = "\r\n____________________________________________________________________"
                    var venue = "\r\nvenue: " + results[i].venue.name;
                    var location = "\r\nlocation: " + results[i].venue.city + "," + results[i].venue.region + " " + results[i].venue.country;
                    var date = "\r\nDate: " + moment(results[i].datetime).format("MM/DD/YYYY");
                    
                    console.log(line)
                    console.log(venue)
                    console.log(location)
                    console.log(date)
                        fs.appendFile("log.txt", "\r\n" + line + "\r\n" + venue + "\r\n" + location + "\r\n" + date + "\r\n", function(err) {

                            if (err) {
                            console.log(err);
                            }
                            else {
                            // console.log("Content Added!");
                            }
                        })
                }}
                
                else {
                    var sorry = "Sorry, no current dates scheduled."
                    console.log(sorry)
                }
        }
    )}


function song(request){

spotify.search({ type: 'track', query: request, limit:5}, function(err, data) {
    var song = data.tracks.items;
    for(var i = 0; i < song.length; i++){
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    if(song){
        fs.appendFile("log.txt", "\r\n***************spotify-this******************* : " + request , function(err) {

            if (err) {
            console.log(err);
            }
            else {
            // console.log("Content Added!");
            }
        })

        var line = "______________________________________________________________________________\r\n"
        var artist = "Artist: " + song[i].album.artists[0].name;
        var searchSong = "Song: " + song[i].name;
        var album = "Album: " + song[i].album.name;
        var spotify = "Spotify link: " + song[i].album.external_urls.spotify;

        fs.appendFile("log.txt", "\r\n" + line + "\r\n" + artist + "\r\n" + searchSong + "\r\n" + album + "\r\n" + spotify + "\r\n", function(err) {

            if (err) {
            console.log(err);
            }
            else {
            // console.log("Content Added!");
            }
        })
        

        console.log(line);
        console.log(artist);
        console.log(searchSong);
        console.log(album);
        console.log(spotify);
    }
 
 else{
     console.log("no song")
 }
//  console.log(song.items);
// console.log(song)

    
  }})};
    
function doWhat(){

    fs.readFile("random.txt", "utf8", function(error, data) {

        
        if (error) {
          return console.log(error);
        }
      
        // console.log(data) 
        dataArr = data.split(",");
        // console.log(dataArr);
        if(dataArr[0] === "spotify-this-song"){
            song(dataArr[1]);

        }
        else if(dataArr[0] === "movie-this"){
            movie(dataArr[1]);
        }
        else if(dataArr[0] === "concert-this"){; 
            concert(dataArr[1]);
            
        }

             });
        
      
 } 

