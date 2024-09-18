import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    
    process.exit(1);
});

dotenv.config();

connectDatabase();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server Working 3!"
    })
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(4000, () => console.log("server listening on port 4000"));

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});