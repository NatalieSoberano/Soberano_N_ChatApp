// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

// the packet is whatever data we send through with the connected event from the server 
// this is data destructuring - look up on MDN 
function setUserId({sID}){
    // debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showTyping({msg, id}){
    console.log(msg);
    // this is where the UI gets triggered 
    // opacity none for example
    if(id!==vm.sID) {
        document.querySelector(".showTyping").style.opacity = 1;
    }
}

function showDisconnectMessage(){
    console.log('a user disconnected');
}

function appendMessage(message){
    vm.messages.push(message);
    document.querySelector(".showTyping").style.opacity = 0;
}

const vm = new Vue ({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: [],
        typing:false
    }, 

    methods: {
        // emit a message event to the server so that is can inturn send this to anyone who connects
        dispatchMessage(){
            console.log('handle emit message');

            //the double pipe || is an or operator
            //if the first value is set, use it, else use whatever comes after the or 

            socket.emit('chat_message', {
                content: this.message, 
                name: this.nickname || "anonymous"
            })

            this.message = "";
        },

        captureKeyStroke(){

            if (!this.typing) {
                socket.emit('typing', {
                name: this.nickname || "anonymous",
                typing: true
                })
            }

            this.typing=true;
        },

        releaseKeyStrokes(){

            this.typing=false;
        }
    }, 

    created: function(){
        this.nickname = localStorage.getItem("cachedUser");
    },

    mounted: function() {
        console.log('vue is done mounting');
    }, 

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('typingNotification', showTyping);
