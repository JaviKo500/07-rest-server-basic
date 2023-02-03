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
        const exitsEmail = await User.findOne( {email} );
        if( exitsEmail ) return res.status(400).json({
            msg: 'Email is register'
        });
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt );
        await user.save();
        res.status(200).json({
            msg: 'save user',
            user
        })
    } catch (error) {
        res.status(500).json({
            error
        })
        console.log(`error post: ${error}`);
    }
}

const usersPut = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: ' api controller put',
        id
    })
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