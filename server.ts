import express from 'express';
import {createServer} from "http";
import {Server} from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport"
import {Lobby} from "./src/rooms/Lobby";
import {ChatRoom} from "./src/rooms/ChatRoom";
import {ChatRoomState} from "./src/states/ChatRoomState";

const expressApp = express();
const port = 3000;
const server = createServer(expressApp);

const colyseus = new Server({
    transport: new WebSocketTransport({
        server: server,
        pingInterval: 1000,
        pingMaxRetries: 3
    })
});

// Main Gateway Lobby
colyseus.define("Lobby", Lobby);
colyseus.define("ChatRoom", ChatRoom);


server.listen(port, ()=> {
    console.log(`Server Started on Port ${port}`);
});
