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


switch (action) {
    case "movie-this":
      movie();
      break;
    
      case "concert-this":
      concert();
      break;

      case "spotify-this-song":
      song();
      break;
    
}

function movie(){
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
        if(request){
            console.log("\r\nMovie Title: " + response.data.Title);
            console.log("\r\nYear released: " + response.data.Year);
            console.log("\r\nRated: " + response.data.Rated);
            console.log("\r\nRotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("\r\nCountry of production: " + response.data.Country);
            console.log("\r\nLanguage: " + response.data.Language);
            console.log("\r\nPlot: " + response.data.Plot);
            console.log("\r\nCast: " +  response.data.Actors);
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

function concert(){
    
    axios.get("https://rest.bandsintown.com/artists/" + request +"/events?app_id=codingbootcamp ").then(
        function(response){
             
            results = response.data;     
            if(results === true){
                for(var i = 0; i < results.length; i++){
                    console.log("\r\n____________________________________________________________________");
                    console.log("\r\nvenue: " + results[i].venue.name);
                    console.log("\r\nlocation: " + results[i].venue.city + "," + results[i].venue.region + " " + results[i].venue.country);
                    console.log("\r\nDate: " + moment(results[i].datetime).format("MM/DD/YYYY"));        
                }}
                else{
                    console.log("Sorry, no current dates scheduled.")
                }
        }
    )}


function song(){
//     Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
spotify.search({ type: 'track', query: request, limit:10}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    var song = data.tracks;
    if(song){
    console.log("========================================")
    console.log("Album: " + song.items[0].album.name);
    console.log("Artist: " + song.items[0].album.artists[0].name);
    console.log("Song: " + song.items[0].name);
    console.log("Spotify link: " + song.items[0].album.external_urls.spotify);
    console.log("========================================")
 }
 else{
     console.log("no song")
 }
//  console.log(song.items);
// console.log(song)

    
  });
    // spotify.search({ type: 'track', query: request, limit: 5 })
    // .then(function(response) {
    //     console.log(response.tracks.name);
    //     console.log(response.tracks.album);
    //     console.log(response.tracks.artists);
    //     // console.log(response.tracks.items);
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
}

