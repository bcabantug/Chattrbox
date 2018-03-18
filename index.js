/*eslint-disable no-console*/
var http = require("http"); //uses http
var fs = require("fs"); //uses fs
//var path = require("path");
//calls extrack.js to start when index.js is run
var extract = require("./extract");
//mime to detect file extensions
const mime = require("mime");
//establish the websocketserver to initialize with the other modules when index.js runs
var wss = require("./websockets-server");

//if file path does not exist, then call handleError
var handleError = function(err, res){
  res.writeHead(404); //write error to browser
  //read the 404 image from app/error.html
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
      //media type detected using mime.getType
    var MediaType = mime.getType(filePath);
    //sets the header of the content type to whatever is detected
    res.setHeader("Content-Type", MediaType);
    res.end(data);
    }
  });
});
server.listen(3000);
