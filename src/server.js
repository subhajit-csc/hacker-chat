/**
 * Module dependencies.
 */

var app = require('../src/server/app');
var debug = require('debug')('hacker-chat:server');
var http = require('http');
//require('../src/server/chat');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

 var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


//module.exports = server


var io = require("socket.io")(server);

 // Will be in db in real world
 const users = [];
 const messages = [];
 let currentId = 0;


 io.on("connection", function(socket) {
   console.log("LOG:: a user connected");
   socket.emit("get users list", JSON.stringify(users));
   socket.emit("get messages history", JSON.stringify(messages));

   socket.on("message", function(msg) {
     console.log(
       "LOG:: message from UserId: " + msg.userId + " --> " + msg.text
     );
     const message = {
       ...msg,
       timestamp: new Date()
     };
     messages.push(message);
     io.emit("message", JSON.stringify(message));
   });

   socket.on("user name added", function(name) {
     console.log("LOG:: user '" + name + "' entered the room");
     const newUser = {
       name,
       id: ++currentId,
       isCurrent: false
     };

     users.push(newUser);
     socket.emit("my user added", JSON.stringify(newUser));
     io.emit("user name added", JSON.stringify(newUser));
   });

   socket.on("disconnect", function() {
     console.log("LOG:: user disconnected");
   });
 });
