const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const cors = require('cors');
require('dotenv').config();

const {
  PORT = 8080,
  NODE_ENV = 'production',
  WEBSOCKET_DEV_PORT = 8989,
} = process.env;

const app = express();
app.use(cors());
const server = app
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () =>
    console.log(
      `Chat Server listening on port ${
        NODE_ENV === 'production' ? PORT : WEBSOCKET_DEV_PORT
      }!`,
    ),
  );

// Initialise wss as a new Websocket Server
const wss =
  NODE_ENV === 'production'
    ? new WebSocket.Server({ server })
    : new WebSocket.Server({ port: WEBSOCKET_DEV_PORT });
// Array of users currently logged in. Serves as the Database.
let users = [];

// Send updates to all clients connected to the web socket server
const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    // The check client !== ws ensures that you don't double up with
    // client side updating for adding messages
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

// This is the code that will run on the server when a new client is connected to
// the web socket server.
wss.on('connection', (ws) => {
  // Random number for user id
  let userId = Math.floor(Math.random() * 10 ** 10);
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const user = { name: data.name, id: userId };
    console.log(message);
    switch (data.type) {
      case 'ADD_USER': {
        // When we add the new user to the array of users, use userId
        users.push(user);
        ws.send(
          JSON.stringify({
            type: 'USERS_LIST',
            users,
          }),
        );
        broadcast(
          {
            type: 'USERS_LIST',
            users,
          },
          ws,
        );
        ws.send(
          JSON.stringify({
            type: 'ADD_USER',
            user,
          }),
        );
        break;
      }
      case 'ADD_MESSAGE':
        broadcast(
          {
            type: 'ADD_MESSAGE',
            message: data.message,
            author: data.author,
          },
          ws,
        );
        break;
      default:
        break;
    }
  });

  // When the connection is closed, remove the user with userId
  ws.on('close', () => {
    // Remove User from 'database'
    users = users.filter((u) => {
      return u.id !== userId;
    });
    // Send updated user list to all the connected users
    broadcast(
      {
        type: 'USERS_LIST',
        users,
      },
      ws,
    );
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
