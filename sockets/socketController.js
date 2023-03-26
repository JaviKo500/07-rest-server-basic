const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers/generateJWT");

// TODO delete instance
const socketController = async ( socket = new Socket() ) => {
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT( token );
    if ( !user) {
        return socket.disconnect();
    } else {
        console.log('connect', user.name);
        console.log(socket.handshake.headers['x-token']);
    }
}

module.exports = {
    socketController
}