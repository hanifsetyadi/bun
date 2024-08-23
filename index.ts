import {v4 as uuidv4} from "uuid";

const clientMap = new Map();

let onlineUser = 0;

const server = Bun.serve({
  port: 8080,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response(Bun.file('./public/index.html'));
  },
  websocket: {
    open(ws) {
      const clientId = uuidv4();
      clientMap.set(ws, clientId);
      console.log(`Client connected: ${clientId}`);
      ws.send(`Client Connected: ${clientId}`);

      // Display Online Users
      onlineUser++;
      ws.send(`Online User: ${onlineUser}`)
      ws.send("Welcome to the server")

      // Display new clients
      ws.subscribe("usersConnected")
      server.publish("usersConnected", `${clientId} - is Online`)

      // Broadcast message publicly
      ws.subscribe("broadcastMsg")
    },
    close(ws) {
      const clientId = clientMap.get(ws) || "Unknown"
      console.log(`Client Disconnected: ${clientId}`);
      clientMap.delete(ws)
      
      // Update the connected clients
      onlineUser--;
      ws.send(`Online User: ${onlineUser}`)
      
      // Display Disconnected client
      server.publish("usersConnected", `${clientId} - has left the chat`)
      ws.unsubscribe("welcome")
    },
    message(ws, msg) {
      const clientId = clientMap.get(ws) || "Unknown"

      // Broadcast message publicly
      server.publish("broadcastMsg", `${clientId} - ${msg}`)
    },
  },
});
console.log(`Listening on localhost: ${server.port}`);
