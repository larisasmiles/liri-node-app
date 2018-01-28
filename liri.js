
var command = process.argv[2];

function liri(command){
if (command === 'my-tweets'){
   
    var tweety = require('twitter'); // this is how we import the tweety package
    var config = require('./keys.js') //this is we import the config 
    //file which is a js file which contains the keys ans tokens
    var twitter = new tweety(config); //this is the object of tweety 
    
    var params = {
    // q: 'statuses/user_timeline',
    screen_name: 'Larisasmiles',
    count: 20
    } 
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets);
        for (let index=0; index<tweets.length; index++){
              console.log("Tweet " + index + " created at "+tweets[index].created_at+" : " +tweets[index].text);
            }
      }
    });
}
else if (command === 'spotify-this-song'){
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
      id: 'aa736f1844974627b33a18f0b3eb29d5',
    secret: 'a7bb015c1cc248a5846b00c4bb79bd94'
    });

    spotify
    .search({ type: 'track', query: process.argv[3] })
    .then(function(data) {
      var songInfo = data.tracks.items;
   
     for (var index=0; index < songInfo.length; index++){
      
        console.log('\n Artist: '+ songInfo[index].artists[0].name);
        console.log('Song: '+ songInfo[index].name);
        console.log('Album: '+ songInfo[index].album.name);
        console.log('Song URL: '+ songInfo[index].preview_url);
     }
    
    })
    .catch(function(err) {
      console.log(err);
    });

}

else if (command === 'movie-this'){
    var request = require("request");
      if (process.argv[3] == null){

          process.argv[3]="Mr. Nobody";
          console.log(process.argv[3]);
      };

      // Then run a request to the OMDB API 
//       request("http://www.omdbapi.com/?t="+ process.argv[3]+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
     
//         if (!error && response.statusCode === 200) {
      
//           console.log("\n Title of the Movie: "+JSON.parse(body).Title+
//                       "\n Year the movie came out: "+JSON.parse(body).Year+
//                       "\n IMDB Rating of the movie: "+JSON.parse(body).imdbRating+
//                       "\n Rotten Tomatoes Rating of the movie: "+JSON.parse(body).Value+
//                       "\n Country where the movie was produced: "+ JSON.parse(body).Country+
//                       "\n Language of the movie: "+JSON.parse(body).Language+
//                       "\n Plot of the Move: "+JSON.parse(body).Plot+
//                       "\n Actors in the movie: "+JSON.parse(body).Actors);            
//         }
//       });
// }
  //write in log.txt
  var fs = require("fs");
  fs.appendFile("log.txt", "\n" + command + "  "+ process.argv[3], err =>{
    if (err){
      return console.log(err);
    }
    // console.log("log.txt was updated");
  });
}

if (command === 'do-what-it-says'){
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
    
      if (error) {
        return console.log(error);
      }
      var newCommand = data.split(",");
      command = newCommand[0];
      process.argv[3]= newCommand[1];
      console.log(command);
      console.log(process.argv[3]);
      liri(command);
     
});
}
    liri(command);