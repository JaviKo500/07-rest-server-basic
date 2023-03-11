const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
            usersRoute: '/api/users',
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.products, require('../routes/products') );
        this.app.use( this.paths.usersRoute, require('../routes/users') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );
        this.app.use( this.paths.search, require('../routes/search') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Port => ${this.port}`);
        }); 
    }

}


module.exports = Server;