/*eslint-disable no-console*/
/* global require */
var WebSocket = require("ws");
//create websocket server and assign port number to it
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
//array to hold log of messages
var messages = [];

//var to hold current topic
var topic = "";

console.log("websocket server started");

//does establishing new topic clear the previous messages in the array?


//establishing any callbacks from connection events
ws.on("connection", function(socket) {
  console.log("client connection established");

  //send out the current topic established
  socket.send("*** Topic is '" + topic + "'");

  //sends out all previous messages to new user/connection
  messages.forEach(function(msg) {
    socket.send(msg);
  });




  //establishing the echo server
  socket.on("message", function(data) {
    var s = data.split(" ");

    //listen for command
    if (s[0] == "/topic") {
      //get topic
      var ss = s.slice(1);
      topic = ss.toString().replace(/,/g, " ");
      //set topic
      //setting custom command to set topic
      console.log("Topic change: " + topic);
      topic = s[0];
      //console.log(topic);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });

    } else {
      console.log("message recieved: " + data);
      //push the message to the array
      messages.push(data);
      //sends the new message to all connected clients on the WebSocket
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data); //works like socket.send(data)
      });
      //socket.send(data);
    }

  });
  // socket.emit("/topic", function(dataTop){
  //   //setting custom command to set topic
  //       console.log("Topic change: " + dataTop);
  //       topic = dataTop;
  //       console.log(topic);
  //       ws.clients.forEach(function(clientSocket){
  //         clientSocket.send("*** Topic has changed to " + topic);
  //     });
  //
  // });




});
