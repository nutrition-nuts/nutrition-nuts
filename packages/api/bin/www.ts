#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import app from '../app';
 import http from 'http';
 import { PORT } from '../config/constants';
 
 /**
  * Get port from environment and store in Express.
  */
 app.set('port', PORT);
 
 /**
  * Create HTTP server.
  */
 const server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 server.listen(PORT);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Event listener for HTTP server "error" event.
  */
 function onError(error: Error & { syscall?: string; code?: string }) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
 
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
   const addr = server.address();
   const bind =
     typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr?.port ?? '?');
   console.log('Listening on ' + bind);
 }
 