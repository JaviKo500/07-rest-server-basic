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


    socket.on( 'disconnect', ( ) =>{
        chatMessage.userDisconnect( user._id);
        io.emit('active-users', chatMessage.usersArr );
    });
}

module.exports = {
    socketController
}