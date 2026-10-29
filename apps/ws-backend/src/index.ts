import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Zylo WebSocket server running on port 8080");

wss.on("connection", function connection(ws) {
    console.log("A client connected");

    ws.on("message", function message(data) {
        console.log("Message received:", data.toString());
        ws.send("pong");
    });

    ws.on("close", function close() {
        console.log("A client disconnected");
    });
});