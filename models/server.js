const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        this.authPath = '/api/auth';
        // connect db
        this.connectionDB();
        // Middleware
        this.middleware();
        // app routes
        this.routes();
    }
    async connectionDB () {
        await dbConnection();
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
        this.app.use( this.authPath, require('../routes/auth') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Port => ${this.port}`);
        }); 
    }
}


module.exports = Server;