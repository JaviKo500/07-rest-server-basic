const { disconnect } = require("mongoose");
const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers/generateJWT");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage()
// TODO delete instance
const socketController = async ( socket = new Socket(), io ) => {
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT( token );
    if ( !user) {
        return socket.disconnect();
    }
    // * add user
    chatMessage.addUser( user );
    io.emit('active-users', chatMessage.usersArr ); 
    socket.emit('receive-message', chatMessage.last10 ); 
    
    socket.

    socket.on( 'disconnect', ( ) =>{
        chatMessage.userDisconnect( user._id);
        io.emit('active-users', chatMessage.usersArr );
    });

    socket.on( 'send-message', ({ message, uid }) =>{
        chatMessage.sendMessage( user._id, user.name, message )
        io.emit('receive-message', chatMessage.last10 );
    });
}

module.exports = {
    socketController
}