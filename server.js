const express = require('express');
const path = require('path');
const { OPEN, Server } = require('ws');

const PORT = process.env.PORT || 8080;

const app = express();
const server = app
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`Chat Server listening on port ${PORT}!`));

// Initialise wss as a new Websocket Server running in port 8080
const wss = new Server({ server });
// Array of users currently logged in. Serves as the Database.
let users = [];

// Send updates to all clients connected to the web socket server
const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    // The check client !== ws ensures that you don't double up with
    // client side updating for adding messages
    if (client.readyState === OPEN && client !== ws) {
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
    console.log(message);
    switch (data.type) {
      case 'ADD_USER': {
        // When we add the new user to the array of users, use userId
        users.push({ name: data.name, id: userId });
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
