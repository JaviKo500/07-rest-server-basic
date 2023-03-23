const { Socket } = require("socket.io")

// TODO delete instance
const socketController = ( socket = new Socket() ) => {
    console.log('connect client', socket.id);
}

module.exports = {
    socketController
}