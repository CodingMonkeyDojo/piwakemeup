var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'src/client/public')));

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

var server = app.listen(8080, function () {
  console.log('Node Express Webserver Started');
});