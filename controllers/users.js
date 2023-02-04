const { response, request } = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersGet = (req = request, res = response) => {
    const {q, name = 'no name'} = req.query;
    res.json({
        msg: ' api controller get',
        q,name
    })
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
const usersDelete = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: ' api controller delete',
        id
    })
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