const socket = io();

socket.emit('join-room', { roomId, userId: 10 });