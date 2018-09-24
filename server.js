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
app.set('trust proxy', true)
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API
app.get('/api/whoami', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

var ip=req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
var lang=req.headers['accept-language'].split(',')[0];
var os=req.headers["user-agent"].split("(")[1].split(")")[0];

  var object = {
  ipaddress: ip,
  language:  lang,
  software: os
};
    res.json(object);
});
// 404 ERROR
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('404 Not found');
});

// 500 ERROR
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || '500 INTERNAL SERVER ERROR');
  }
})
var port=process.env.PORT || 8080;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log('The app is listening on port ' + listener.address().port);
});
