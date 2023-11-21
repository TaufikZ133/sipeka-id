import express from "express" ;
import db from "./config/Database.js"
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import http from "http";
import { Server } from 'socket.io'
const app = express();
const server = http.createServer(app);
dotenv.config();
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST","DELETE", "PUT"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room : ${data}`)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

try {
    await db.authenticate();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);
app.use('/images',express.static('images'));
app.use(express.static(path.join(__dirname, '/images')));
server.listen(5000, ()=> console.log('Server running at port 5000'));