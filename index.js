/*eslint-disable no-console*/
var http = require("http");
var fs = require("fs");
//var path = require("path");
var extract = require("./extract");
const mime = require("mime");


var handleError = function(err, res){
  res.writeHead(404);
  fs.readFile("app/error.html", function(err, data){
    res.end(data);
  });
  //res.end();
}

var server = http.createServer(function (req, res){
  console.log("Responding to a request.");
  //var url = req.url;

  //var fileName = "index.html";
  //if(url.length > 1){
  //  fileName = url.substring(1);
  //}
  //console.log(fileName);
  //var filePath = path.resolve(__dirname, 'app', fileName);

  //res.end("<h1>Hello, World!!</h1>");
  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data){
    if (err){
      filePath = "app/error.html";
      handleError(err, res);
      return;
    } else {
    var MediaType = mime.getType(filePath);
    res.setHeader("Content-Type", MediaType);
    res.end(data);
    }
  });
});
server.listen(3000);
