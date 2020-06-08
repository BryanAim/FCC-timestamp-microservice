// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// let date = new Date()
// let today = date.toUTCString()
// let month = date.getMonth()
// console.log(date)
// console.log(today);
// console.log(month);

app.get('/api/timestamp/', function (req, res) {
  res.json({
    unix: Date.now(),
    utc: Date()
  })
})

app.get('/api/timestamp/:date_string', function (req,res) {
  let dateString = req.params.date_string
  // console.log(dateString);

  // test to see if the date_string contains more than 5 digits, if so it is a unix timestamp
  if (/\d{5,}/.test(dateString)) {
    //convert the date_sting passsed into an integer if its not a UTC date format
    let dateInt = parseInt(dateString)
    res.json({
      unix: dateString,
      utc: new Date(dateInt).toUTCString()
    })
  } else {
    let dateObject = new Date(dateString)
    if (dateObject.toString()=== 'Invalid Date') {
      res.json({
        error: 'Sorry, Invalid Date'
      })
    } else {
      res.json({
        unix: dateObject.valueOf(),
        utc: dateObject.toUTCString()
      })
    }
  }
  
  })



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});