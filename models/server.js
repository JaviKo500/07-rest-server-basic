const cors = require('cors');
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users'
        // Middleware
        this.middleware();
        // app routes
        this.routes();
    }
    
    middleware() {
        // cors 
        this.app.use(cors());
        // parser data
        this.app.use( express.json() );
        
        this.app.use( express.static('public') );
    }
    routes() {
        this.app.use( this.usersRoutePath, require('../routes/users') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Port => ${this.port}`);
        }); 
    }
}


module.exports = Server;