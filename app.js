var express = require('express');
var app = express();

// add socket here 
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// attach out chat server to our app - like setting up a mailbox
    // socket is almost like fedex who delivers mail
io.attach(server);

io.on('connection', function(socket){ // socket is your connection 
    console.log('a user has connected');

    //this is the packet we are passing through - id and a message
    socket.emit('connected', {sID: socket.id, message: "new connection"});

    socket.on('chat_message', function(msg){
        console.log(msg); // lets see what the payload dis from the client side

        //tell the connection manager (socket io) to send this message to everyone
        // anyone connected will get this msg (including the sender)
        io.emit('new_message', { id: socket.id, message: msg})

    })

    socket.on('disconnect', function(){
        console.log('a user has disconnected');
    })
})