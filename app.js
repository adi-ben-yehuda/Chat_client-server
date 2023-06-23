import express from 'express'
const app = express();

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json())

import cors from 'cors'
app.use(cors());

import customEnv from 'custom-env'
customEnv.env(process.env.NODE_ENV, './config')
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING)
console.log('PORT:', process.env.PORT)

import router from './routes/userPassName.js'
app.use('/api', router);
import userPassRouter from './routes/userPass.js'
app.use('/api', userPassRouter);
import chatRouter from './routes/chats.js'
app.use('/api', chatRouter);
import userRouter from './routes/user.js'
app.use('/api', userRouter);
import userRouterMessage from './routes/message.js'
app.use('/api', userRouterMessage);

app.use(express.static('public'))

import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
try {
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}

import { Server } from 'socket.io';

import http from 'http';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Socket.io connection event
io.on('connection', (socket) => {
  socket.on('myuser', user => {
    socket.join(user)
  })

  socket.on('add-message', (contact, message) => {
    io.to(contact).emit('new-message', message); // Emit message to the specific contact only
  })
  socket.on('disconnect', () => {
  });
});

server.listen(process.env.PORT)