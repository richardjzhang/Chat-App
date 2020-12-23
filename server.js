const WebSocket = require('ws');

const PORT = 8989;
const wss = new WebSocket.Server({ port: PORT });

let users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  // Random number
  let userId = Math.floor(Math.random() * 10 ** 10);
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(message);
    switch (data.type) {
      case 'ADD_USER': {
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

  ws.on('close', () => {
    // Remove User from 'database'
    users = users.filter((u) => {
      return u.id !== userId;
    });
    broadcast(
      {
        type: 'USERS_LIST',
        users,
      },
      ws,
    );
  });
});

console.log(`Listening on port ${PORT}`);
