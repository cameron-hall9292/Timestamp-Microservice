// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//add a port

const PORT = process.env.PORT || 5500;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {

  let userInput = req.params.date;
  
   // variable for when regular date type is input
  let date = new Date(userInput);

  let dateToUTC = date.toUTCString()

  let unixFromRegDate = parseInt(date.getTime() / 1000);

  unixFromRegDate *= 1000;



// variable for when unix date type is input
  let unixInput = parseInt(userInput);
  let dateFromUnix = new Date(unixInput).toUTCString();

if (dateToUTC !== "Invalid Date"){
 
    res.json({unix: unixFromRegDate ,utc: dateToUTC});
}

else if (dateFromUnix !== "Invalid Date"){


    res.json({unix: unixInput ,utc: dateFromUnix});
}

else {
    res.json({error : "Invalid Date"});
}


}); 





app.get("/api",function (req,res) {

  res.json({unix: Date.now(),utc: new Date().toUTCString()});
  
});




// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
