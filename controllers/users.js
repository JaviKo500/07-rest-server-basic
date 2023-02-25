const { response, request } = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersGet = async (req = request, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { status:true};
        const [total, users] = await Promise.all([
            User.countDocuments( query ),
            User.find( query )
            .skip( Number(since) )
            .limit( Number(limit) )
        ]);
        res.status(200).json({
            total,
            users
        });
    } catch (error) {
        res.status(500).json({
          error,
        });
        console.log(`error get: ${error}`);  
    }
}
const usersPost = async (req, res = response) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User( { name, email, password, role } );
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt );
        await user.save();
        res.status(200).json({
            msg: 'save user',
            user
        });
    } catch (error) {
        res.status(500).json({
            error
        })
        console.log(`error post: ${error}`);
    }
}

const usersPut = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {_id, password, google, email, ...rest } =req.body;
        if ( password ) {
            const salt = bcrypt.genSaltSync(10);
            rest.password = bcrypt.hashSync( password, salt );
        }
        const userDb = await User.findByIdAndUpdate( id, rest )
        res.json({
            msg: ' api controller put',
            rest
        })
    } catch (error) {
        res.status(500).json({
            error
        })
        console.log(`error put: ${error}`);
    }
}
const usersDelete = async (req, res = response) => {
    try {
        const {id} = req.params;
        //* delete physical
        // const user = await User.findByIdAndDelete( id );
        const user = await User.findByIdAndUpdate( id, { status: false } );
        res.status(200).json({
          user,
        });
    } catch (error) {
        res.status(500).json({
          error,
        });
        console.log(`error delete: ${error}`);
    }
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: ' api controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
};