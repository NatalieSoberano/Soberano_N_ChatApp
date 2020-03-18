var express = require('express');
var app = express();
// var typing = false;
// var timeout = undefined;
// var user;

// add socket here 
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
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

    // $('#message').keypress((e)=>{
    // if(e.which!=13){
    //     typing=true
    //     socket.emit('typing', {user:user, typing:true})
    //     clearTimeout(timeout)
    //     timeout=setTimeout(typingTimeout, 3000)
    // }else{
    //     clearTimeout(timeout)
    //     typingTimeout()
    //     sendMessage()
    //     }
    // })
    
    socket.on('chat_message', function(msg){
        console.log(msg); // lets see what the payload dis from the client side

        //tell the connection manager (socket io) to send this message to everyone
        // anyone connected will get this msg (including the sender)
        io.emit('new_message', { id: socket.id, message: msg})
    })

    socket.on('disconnect', function(){
        console.log('a user has disconnected');
    })

    // socket.on('display', (data)=>{
    //     if(data.typing==true)
    //         $('.typing').text(`${data.user} is typing...`)
    //     else
    //         $('.typing'.text(""))
    // })

    // socket.on('typing', (data)=>{
    //     if(data.typing==true)
    //         io.emit('display', data)
    //     else    
    //         io.emit('display', data)
    // })
})