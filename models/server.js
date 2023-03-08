const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usersRoute: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
        };
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
        this.app.use( this.paths.usersRoute, require('../routes/users') );
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.products, require('../routes/products') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Port => ${this.port}`);
        }); 
    }
}


module.exports = Server;