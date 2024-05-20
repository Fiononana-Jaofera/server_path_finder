const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080"],
    }
})

io.on("connection", socket => {
    console.log(socket.id);
    socket.on('request', (path, from, to, url) => {
        socket.to(to).emit("send-request", from, url, path);
    });
})