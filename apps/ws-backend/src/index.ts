import { WebSocketServer } from "ws";
import JWT, { JwtPayload } from "jsonwebtoken";
// @ts-expect-error backend-common/config does not currently provide TypeScript declarations.
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8080 });


wss.on("connection", function connection(ws,request) {
    const url = request.url;
    if(!url){
        return;
    }
   const queryParams=new URLSearchParams(url.split("?")[1]);
   const token = queryParams.get("token") || "";
   const decoded = JWT.verify(token, JWT_SECRET);
   if(!decoded || !((decoded as JwtPayload).userId)){
    ws.close();
    return;
   }
    ws.on("message", function message(data) {
        ws.send("pong");
    });

 
});