const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
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

app.get('/socket.io/socket.io.js', (req, res) =>{
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.get('/:roomId', (req, res) => {
    const { roomId } = req.params;
    console.log(roomId,' is the roomId');
    res.render(`room`, { roomId });
});

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.listen(8000, () => {
    console.log('App is listening at port 8000');
});