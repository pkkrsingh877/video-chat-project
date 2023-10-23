const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'));

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up socket.io
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('This is working');
    socket.on('join-room', (roomId, userId) => {
        console.log('someone has joined the room');
        console.log(roomId, userId);
    });
});

app.get('/:roomId', (req, res) => {
    const { roomId } = req.params;
    res.render(`room`, { roomId });
});

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.listen(8000, () => {
    console.log('App is listening at port 8000');
});