var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

global.base = __dirname;
app.use("/", express.static(path.join(__dirname,'dist')));

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port %d', port);
});
