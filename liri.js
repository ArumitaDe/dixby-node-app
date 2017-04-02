//Global Variables
var params='';
var input=process.argv[2];
var secondInput=process.argv[3];



function fileLog(arg1,arg2,output)
{   
    var fs = require("fs");
    var log=  arg1+' '+arg2+ output+'\r\n\r\n\r\n';
    fs.appendFile('log.txt', log, function(err) 
   {
        

   });
}


//Retrieving last 20 tweets
function myTweets()
{
        var Twitter = require('twitter');
        var keys=require("./keys.js");
        var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
        });

        client.get('statuses/user_timeline', 'ArumitaDe', function(error, tweets, response) 
        {
        if (!error) {
        
        var output="\r\n\r\n-----Your last 20 tweets are being displayed-----";
        output=output+"\r\n\r\n";
        for (var i=0;i<=19;i++)
        output=output+"\r"+tweets[i].text+"\r\n";
        console.log(output);
        fileLog('my-tweets','',output);
        }
        
        });
}

function spotified(secondInput)
{
        var spotify = require('spotify');

        if(secondInput==undefined)
            params = 'The Sign';
        else
            params=secondInput;

        spotify.search({ type: 'track', query: params }, function(err, data) 
        {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

       /* for(var i=0;i<data.tracks.items.length;i++)
        {
            console.log("\n\n----Match Number---- : " + i+"\n");          
            console.log("The Album Name is : " + data.tracks.items[i].album.name);
            for(var j=0;j< data.tracks.items[i].artists.length;j++)      
            {
            console.log("The Artists Name is : " + data.tracks.items[i].artists[j].name);
            }
            console.log("The Track name is : " + data.tracks.items[i].name);
            console.log("The Spotify URL for this song is : " + data.tracks.items[i].preview_url);
        }*/
        var output='';
            for(var i=0;i<data.tracks.items.length;i++)
        {
            output = output+ "\r\n\r\n\r\n----Match Number---- : " + (i+1)  +        
                         "\r\n\r\nThe Album Name is : " + data.tracks.items[i].album.name
            for(var j=0;j< data.tracks.items[i].artists.length;j++)      
            {
            output=output+"\r\nThe Artists Name is : " + data.tracks.items[i].artists[j].name;
            }
            output= output+"\r\nThe Track name is : " + data.tracks.items[i].name+
                    "\r\nThe Spotify URL for this song is : " + data.tracks.items[i].preview_url;
        }
        
        console.log(output);
        fileLog('spotify-this-song',params,output);
        });

}

function movie(secondInput)
{
        var request = require('request');
        if(secondInput==undefined)
            params = 'Mr Nobody';
        else
            params=secondInput;
        var querystring ='http://www.omdbapi.com/?t='+params+'&tomatoes=true';
        console.log(querystring);
        request(querystring, function (error, response, body) 
        {
            console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            var data=JSON.parse(body);
            console.log(data);
            /*console.log('\n--------Movie Information---------\n');
            console.log('Title of the movie:', data.Title);
            console.log('Year the movie came out:', data.Year);
            console.log('IMDB Rating of the movie:', data.Ratings[0].Value);
            console.log('Country where the movie was produced:', data.Country);
            console.log('Language of the movie:', data.Language);
            console.log('Plot of the movie:', data.Plot);  
            console.log('Actors in the movie:', data.Actors);
            console.log('Rotten Tomatoes Rating:', data.Ratings[1].Value);
            console.log('Rotten Tomatoes URL:', data.tomatoURL);*/
            var output='';
            if(data.Ratings[1]==undefined)
            { output= '\n\r\n\r\n\r\n--------Movie Information---------\r\n'+
                        '\r\n\r\nTitle of the movie : '+ data.Title+
                        '\r\n\r\nYear the movie came out : '+ data.Year+
                        '\r\n\r\nIMDB Rating of the movie : '+ data.Ratings[0].Value+
                        '\r\n\r\nCountry where the movie was produced : '+ data.Country+
                        '\r\n\r\nLanguage of the movie : '+ data.Language+
                        '\r\n\r\nPlot of the movie : '+ data.Plot+
                        '\r\n\r\nActors in the movie : '+ data.Actors+
                        //'\r\n\r\nRotten Tomatoes Rating : '+ data.Ratings[1].Value+
                        '\r\n\r\nRotten Tomatoes Rating : '+ data.tomatoRating+
                        '\r\n\r\nRotten Tomatoes URL : '+ data.tomatoURL;}
            else
                { output= '\n\r\n\r\n\r\n--------Movie Information---------\r\n'+
                        '\r\n\r\nTitle of the movie : '+ data.Title+
                        '\r\n\r\nYear the movie came out : '+ data.Year+
                        '\r\n\r\nIMDB Rating of the movie : '+ data.Ratings[0].Value+
                        '\r\n\r\nCountry where the movie was produced : '+ data.Country+
                        '\r\n\r\nLanguage of the movie : '+ data.Language+
                        '\r\n\r\nPlot of the movie : '+ data.Plot+
                        '\r\n\r\nActors in the movie : '+ data.Actors+
                        '\r\n\r\nRotten Tomatoes Rating : '+ data.Ratings[1].Value+
                        '\r\n\r\nRotten Tomatoes Rating : '+ data.tomatoRating+
                        '\r\n\r\nRotten Tomatoes URL : '+ data.tomatoURL;}
            
            console.log(output);
            fileLog('movie-this',params,output);
                        
        });
}

function random()
{
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(error, data) 
        {
        // We will then print the contents of data
        console.log(data);
        // Then split it by comma
        var dataArr = data.split(",");
        console.log(dataArr[1]);
        if(dataArr[0]=='spotify-this-song')
            spotified(dataArr[1]);
        else
        if (dataArr[0]=='movie-this')
            movie(dataArr[1]);
        else
        if (dataArr[0]=='my-tweets')
            myTweets();   


        });
}  
            
switch(input)
{
    case  'my-tweets':
    myTweets();
    break;
    
    case  'spotify-this-song' :
    spotified(secondInput);
    break;

    case'movie-this':
    movie(secondInput);
    break;

    case'do-what-it-says':
    random();
    break;

}

        