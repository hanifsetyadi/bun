import {v4 as uuidv4} from "uuid";

let onlineUser = 0;

const clientMap = new Map();
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
      onlineUser++;
      ws.send(`Online User: ${onlineUser}`)
      
      ws.subscribe("welcome")
      server.publish("welcome", "Welcome to the server")

      ws.subscribe("usersConnected")
      server.publish("usersConnected", `${clientId} - is Online`)
    },
    close(ws) {
      const clientId = clientMap.get(ws) || "Unknown"
      console.log(`Client Disconnected: ${clientId}`);
      clientMap.delete(ws)
      onlineUser--;
      ws.send(`Online User: ${onlineUser}`)
      
      server.publish("usersConnected", `${clientId} - has left the chat`)
      ws.unsubscribe("welcome")
    },
    message(ws, msg) {
      console.log(`Incoming message: ${msg}`);
    },
  },
});
console.log(`Listening on localhost: ${server.port}`);
