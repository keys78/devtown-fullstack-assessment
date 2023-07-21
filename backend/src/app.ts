import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http'
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import noteRoutes from './routes/notes'
import * as noteController from "./controllers/notes";
import bodyParser from "body-parser";



const app = express();

export const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    transports: ['websocket'],
    cors: {
        origin:  process.env.BASE_URL,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }
});


// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket: Socket) => {
    console.log('A user connected.');

    socket.emit('currentNotes', noteController.createNoteHandler)

    // kwpt for reference, didn't see any use for it currently
    socket.on('isTyping', () => {
        socket.broadcast.emit('userTyping');
    });
    socket.on('isNotTyping', () => {
        socket.broadcast.emit('userNotTyping');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});



// Authentication
app.use("/auth", authRoutes);
app.use('/user', userRoutes);
app.use("/api/v1/notes", noteRoutes); 

// Landing route
app.get("/", (req, res) =>
    res.json({ success: true, message: "NotesApp api is running!" })
);

// 404 Not Found middleware
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// Error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});


export default app;