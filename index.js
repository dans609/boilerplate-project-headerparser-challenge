// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function(req, res) {
  // get user ip address, @req.headers is used if the user have a proxy
  // @req.socket.remoteAddress is used to get the user remote address
  // thread reference: get the public IP address of a user connected to the app
  // url reference: [https://stackoverflow.com] 
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress

  const data = {
    ipadress: ip,
    language: null,
    software: null,
  }

  res.json(data);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
