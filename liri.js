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

function concert(request){
    
    axios.get("https://rest.bandsintown.com/artists/" + request +"/events?app_id=codingbootcamp ").then(
        function(response){
             
            results = response.data;     
            if(results){
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


function song(request){

spotify.search({ type: 'track', query: request, limit:5}, function(err, data) {
    var song = data.tracks.items;
    for(var i = 0; i < song.length; i++){
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    if(song){
        console.log("______________________________________________________________________________\r\n")
        console.log("Artist: " + song[i].album.artists[0].name);
        console.log("Song: " + song[i].name);
        console.log("Album: " + song[i].album.name);
        console.log("Spotify link: " + song[i].album.external_urls.spotify);    
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
        console.log(dataArr);
        if(dataArr[0] === "spotify-this-song"){
            song(dataArr[1]);

        }
        if(dataArr[0] === "movie-this"){
            movie(dataArr[1]);
        }
        if(dataArr[0] === "concert-this"){
            
            concert(dataArr[1]);
        }

             });
        
      
 } 


