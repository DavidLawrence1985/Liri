// require("dotenv").config();
var fs = require("fs");
var keys = require("./key.js");
var moment = require("moment")
// var spotify = new Spotify(key.spotify);
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
    
}

function movie(){
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
    
    // console.log(JSON.stringify(response.data, null, 2))
        console.log("\r\nMovie Title: " + response.data.Title);
        console.log("\r\nYear released: " + response.data.Year);
        console.log("\r\nRated: " + response.data.Rated);
        console.log("\r\nRotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("\r\nCountry where movie was produced: " + response.data.Country);
        console.log("\r\nLanguage: " + response.data.Language);
        console.log("\r\nPlot: " + response.data.Plot);
        console.log("\r\nCast: " +  response.data.Actors);

  }
    )}

function concert(){
    
//     Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

    
    axios.get("https://rest.bandsintown.com/artists/" + request +"/events?app_id=codingbootcamp ").then(
        function(response){
            // console.log(JSON.stringify(response.data, null, 2))   
            
            results = response.data;     
            
            for(var i = 0; i < results.length; i++){
                console.log("\r\n____________________________________________________________________");
                console.log("\r\nvenue: " + results[i].venue.name);
                console.log("\r\nlocation: " + results[i].venue.city + "," + results[i].venue.region + " " + results[i].venue.country);
                console.log("\r\nDate: " + moment(results[i].datetime).format("MM/DD/YYYY"));
                // console.log("\r\ndate" + resonse.data.datetime)
                // console.log()
                        
         }})}
// use .slice(2).join(" ") to handle spaces
