/*eslint-disable no-console*/
var path = require("path");

var extractFilePath = function (url){
  var filePath;
  var fileName = "index.html";

  if(url.length > 1){
    fileName = url.substring(1);
  }
  console.log("THe fileName is: " + fileName);

  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;
